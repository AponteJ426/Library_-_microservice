import { useEffect, useState } from 'react';
import { FaSearch, FaTh, FaSortAlphaDown, FaHeart } from 'react-icons/fa';
import { CircularProgress, Switch, FormControlLabel } from '@mui/material';
import LibroModal from '../../../components/LibroModal';
import { fetcher } from '../../../services/fetcher'; // Ajusta la ruta según tu estructura de proyecto

const Biblioteca = () => {
    interface Libro {
        id: string;
        titulo: string;
        autor: string;
        descripcion: string;
        imagen: string;
        link: string;
    }

    const [libros, setLibros] = useState<Libro[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [letraSeleccionada, setLetraSeleccionada] = useState('A');
    const [cargando, setCargando] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null);
    const [buscarPorLetra, setBuscarPorLetra] = useState(false);
    const [favoritos, setFavoritos] = useState([]);
    const [enviandoFavorito, setEnviandoFavorito] = useState(false);

    const letras = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    const obtenerLibrosGoogle = async (query: string | number | boolean) => {
        try {
            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
            );
            const data = await res.json();
            return (
                data.items?.map((item: { id: any; volumeInfo: { title: any; authors: any[]; description: any; imageLinks: { thumbnail: any; }; infoLink: any; }; }) => ({
                    id: item.id,
                    titulo: item.volumeInfo.title,
                    autor: item.volumeInfo.authors?.join(', ') || 'Autor desconocido',
                    descripcion: item.volumeInfo.description || '',
                    imagen: item.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg',
                    link: item.volumeInfo.infoLink || '',
                })) || []
            );

        } catch (error) {
            console.error('Error en Google Books:', error);
            return [];
        }
    };


    const obtenerLibrosOpenLibrary = async (query: string | number | boolean) => {
        try {
            const res = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
            );
            const data = await res.json();
            return data.docs.map((libro: { key: any; title: any; author_name: any[]; first_sentence: any[]; cover_i: any; }) => ({
                id: libro.key,
                titulo: libro.title,
                autor: libro.author_name?.[0] || 'Autor desconocido',
                descripcion: libro.first_sentence?.[0] || '',
                imagen: libro.cover_i
                    ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
                    : '/placeholder.jpg',
                link: libro.key ? `https://openlibrary.org${libro.key}` : '',
            }));
        } catch (error) {
            console.error('Error en Open Library:', error);
            return [];
        }
    };

    useEffect(() => {
        const obtenerLibros = async () => {
            setCargando(true);
            const query = busqueda.trim() || letraSeleccionada;
            const [google, openLib] = await Promise.all([
                obtenerLibrosGoogle(query),
                obtenerLibrosOpenLibrary(query),
            ]);
            setLibros([...google, ...openLib]);
            setCargando(false);
        };

        obtenerLibros();
    }, [busqueda, letraSeleccionada]);

    // Obtener la lista de favoritos del backend al cargar el componente
    useEffect(() => {
        const obtenerFavoritos = async () => {
            try {
                // Usar el fetcher para obtener los favoritos
                const data = await fetcher('/favoritos');
                // Asumiendo que tu API devuelve un array de IDs de libros favoritos
                setFavoritos(data.favoritos || []);
            } catch (error) {
                console.error('Error al obtener favoritos:', error);
            }
        };

        obtenerFavoritos();
    }, []);

    const librosFiltrados = libros.filter((libro) =>
        buscarPorLetra
            ? libro.titulo?.toUpperCase().startsWith(letraSeleccionada)
            : true
    );

    const abrirModal = (libro: Libro) => {
        setLibroSeleccionado(libro);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setLibroSeleccionado(null);
    };

    const toggleFavorito = async (e: React.MouseEvent<HTMLButtonElement>, libro: Libro) => {
        e.stopPropagation(); // Evita que se abra el modal al hacer clic en el corazón

        if (enviandoFavorito) return; // Evita múltiples clics rápidos

        // Verificar si el libro ya está en favoritos
        const esFavorito = favoritos.includes(libro.id);

        try {
            setEnviandoFavorito(true);

            // Añadir o quitar de favoritos de forma optimista (para UX más fluida)
            setFavoritos(prev =>
                esFavorito
                    ? prev.filter(id => id !== libro.id)
                    : [...prev, libro.id]
            );

            // Usar el fetcher para la llamada a la API
            await fetcher('/favoritos', {
                method: esFavorito ? 'DELETE' : 'POST',
                body: {
                    libroId: libro.id,
                    libroData: {
                        id: libro.id,
                        titulo: libro.titulo,
                        autor: libro.autor,
                        imagen: libro.imagen,
                        descripcion: libro.descripcion,
                    }
                }
            });

        } catch (error) {
            console.error('Error al gestionar favorito:', error);
            // Revertir el cambio en caso de error
            setFavoritos(prev =>
                esFavorito
                    ? [...prev, libro.id]
                    : prev.filter(id => id !== libro.id)
            );
        } finally {
            setEnviandoFavorito(false);
        }
    };

    return (
        <div className="space-y-6">
            <main className="flex-1 p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    ¡Explora Un Mundo Nuevo Aquí!
                </h2>

                {/* Buscador y opciones */}
                <div className="bg-gray-100 px-4 py-3 rounded shadow-md w-full mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 flex-1">
                        <FaSearch className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full outline-none bg-transparent"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={buscarPorLetra}
                                    onChange={() => setBuscarPorLetra(!buscarPorLetra)}
                                    color="primary"
                                />
                            }
                            label="Buscar por letra"
                        />
                        <button className="flex items-center bg-gray-100 px-3 py-1 rounded text-sm">
                            <FaTh className="mr-1" /> Preencher
                        </button>
                        <button className="bg-gray-100 px-3 py-1 rounded text-sm">Título</button>
                        <button className="bg-gray-100 p-1 rounded">
                            <FaSortAlphaDown />
                        </button>
                        <button className="bg-cyan-500 text-white px-3 py-1 rounded flex items-center">
                            Filtros
                        </button>
                    </div>
                </div>

                {/* Letras */}
                {buscarPorLetra && (
                    <div className="flex gap-3 text-sm text-gray-600 font-medium mb-8 flex-wrap">
                        {letras.map((letra) => (
                            <button
                                key={letra}
                                onClick={() => setLetraSeleccionada(letra)}
                                className={`hover:text-cyan-500 ${letraSeleccionada === letra ? 'text-cyan-500 underline' : ''
                                    }`}
                            >
                                {letra}
                            </button>
                        ))}
                        <button
                            className="text-cyan-500 ml-2"
                            onClick={() => setLetraSeleccionada('')}
                        >
                            # TODOS
                        </button>
                    </div>
                )}

                {/* Libros */}
                <div>
                    <h3 className="text-cyan-500 text-xl font-bold mb-4">
                        {letraSeleccionada || 'Todos'}
                    </h3>

                    {cargando ? (
                        <div className="flex justify-center py-10">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {librosFiltrados.map((libro) => (
                                <div
                                    key={libro.id}
                                    className="text-center cursor-pointer relative"
                                    onClick={() => abrirModal(libro)}
                                >
                                    <div className="relative mb-2">
                                        <img
                                            src={libro.imagen}
                                            alt={libro.titulo}
                                            className="w-full h-52 object-cover rounded"
                                        />
                                        <div className="absolute bottom-0 right-0 bg-orange-500 w-5 h-5 rounded-full" />

                                        {/* Botón de Me Gusta (Corazón) */}
                                        <button
                                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                                            onClick={(e) => toggleFavorito(e, libro)}
                                        >
                                            <FaHeart
                                                className={`${favoritos.includes(libro.id)
                                                    ? 'text-red-500'
                                                    : 'text-gray-400'
                                                    }`}
                                                size={18}
                                            />
                                        </button>
                                    </div>
                                    <h4 className="text-sm font-medium">{libro.titulo}</h4>
                                    <p className="text-xs text-gray-500">{libro.autor}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            <LibroModal open={modalAbierto} onClose={cerrarModal} libro={libroSeleccionado} />
        </div>
    );
};

export default Biblioteca;