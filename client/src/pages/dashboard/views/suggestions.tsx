// src/pages/tu/ruta/suggestion.tsx (ajusta la ruta según tu estructura)
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { fetcher } from '../../../services/fetcher'; // Ajusta la ruta si es distinta

type Sugerencia = {
    id: string;
    titulo: string;
    descripcion?: string;
    autor?: string;
    imagen: string;
    link?: string;
};

const Suggestion = () => {
    const [sugerencias_local, setSugerencias_local] = useState<Sugerencia[]>([]);
    const [sugerencias_google, setSugerencias_google] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchLibroGoogle = async (id: unknown) => {
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = await res.json();
            console.log(data);

            return {
                id: data.id,
                titulo: data.volumeInfo.title ? data.volumeInfo.title : 'Título desconocido',
                autor: data.volumeInfo.authors?.join(', ') || 'Autor desconocido',
                imagen: data.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg',
                link: data.volumeInfo.infoLink || '',
            };
        } catch (error) {
            console.error('Error al obtener detalles del libro:', error);
            return null;
        }
    };
    useEffect(() => {
        const cargarSugerencias = async () => {
            try {
                setCargando(true);
                setError(null);
                const data = await fetcher('/recomendaciones', {
                    method: 'GET',
                });
                const ids = data.recomendaciones;
                const librosLocales = await Promise.all(
                    ids.recomendaciones_locales.map(async (id: unknown) => await fetchLibroGoogle(id))
                );
                const librosGoogle = await Promise.all(
                    ids.recomendaciones_google.map(async (id: unknown) => await fetchLibroGoogle(id))
                );
                setSugerencias_local(librosLocales);
                setSugerencias_google(librosGoogle);


            } catch (e: unknown) {
                console.error('Error al cargar sugerencias:', e);
                setError(e instanceof Error ? e.message : 'Error desconocido al obtener sugerencias');
            } finally {
                setCargando(false);
            }
        };

        cargarSugerencias();
    }, []);

    return (<>
        <div className="p-6">
            <h2 className="text-2xl font-bold text-cyan-600 mb-4">Sugeridos para ti por SapienSS </h2>

            {cargando ? (
                <div className="flex justify-center py-10">
                    <CircularProgress />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : sugerencias_local.length === 0 ? (
                <p className="text-gray-500">Por ahora no hay sugerencias disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {sugerencias_local.map((libro) => (
                        <a
                            key={libro.id}
                            href={libro.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center block hover:scale-105 transition transform"
                        >
                            <div className="relative mb-2">
                                <img
                                    src={libro.imagen}
                                    alt={libro.titulo}
                                    className="w-full h-52 object-cover rounded"
                                />
                            </div>
                            <h4 className="text-sm font-medium">{libro.titulo}</h4>
                            {libro.autor && (
                                <p className="text-xs text-gray-500">{libro.autor}</p>
                            )}
                            {libro.descripcion && (
                                <p className="text-xs text-gray-400 line-clamp-3 mt-1">
                                    {libro.descripcion}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
        <div className="p-6">
            <h2 className="text-2xl font-bold text-cyan-600 mb-4">Sugeridos para ti por google Books </h2>

            {cargando ? (
                <div className="flex justify-center py-10">
                    <CircularProgress />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : sugerencias_google.length === 0 ? (
                <p className="text-gray-500">Por ahora no hay sugerencias disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {sugerencias_google.map((libro) => (
                        <a
                            key={libro.id}
                            href={libro.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center block hover:scale-105 transition transform"
                        >
                            <div className="relative mb-2">
                                <img
                                    src={libro.imagen}
                                    alt={libro.titulo}
                                    className="w-full h-52 object-cover rounded"
                                />
                            </div>
                            <h4 className="text-sm font-medium">{libro.titulo}</h4>
                            {libro.autor && (
                                <p className="text-xs text-gray-500">{libro.autor}</p>
                            )}
                            {libro.descripcion && (
                                <p className="text-xs text-gray-400 line-clamp-3 mt-1">
                                    {libro.descripcion}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    </>
    );
};

export default Suggestion;
