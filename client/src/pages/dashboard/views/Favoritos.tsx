import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { fetcher } from '../../../services/fetcher'; // Ajusta la ruta si es distinta

const Favoritos = () => {
    const [libros, setLibros] = useState<Array<{ id: string; titulo: string; autor: string; imagen: string; link: string }>>([]);
    const [cargando, setCargando] = useState(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchLibroGoogle = async (id: any) => {
        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = await res.json();
            console.log(data);

            return {
                id: data.id,
                titulo: data.volumeInfo.title,
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
        const cargarFavoritos = async () => {
            try {
                const response = await fetcher('/favoritos'); // Devuelve { favoritos: ['id1', 'id2', ...] }
                const ids = response.favoritos;


                const detalles = await Promise.all(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ids.map(async (id: any) => await fetchLibroGoogle(id))
                );

                setLibros(detalles.filter(Boolean)); // Filtra nulos
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarFavoritos();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-cyan-600 mb-4">Mis Libros Favoritos</h2>

            {cargando ? (
                <div className="flex justify-center py-10">
                    <CircularProgress />
                </div>
            ) : libros.length === 0 ? (
                <p className="text-gray-500">Aún no tienes libros favoritos.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {libros.map((libro) => (
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
                            <p className="text-xs text-gray-500">{libro.autor}</p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favoritos;
