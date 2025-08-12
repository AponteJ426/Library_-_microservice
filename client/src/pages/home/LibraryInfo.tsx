
const LibraryInfo = () => {
    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="md:w-1/2 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Datos relevantes de <br />
                        libros, revistas y muchos más.
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg">
                        Simplemente ingresa a nuestra herramienta educativa, en esta encontrarás toda la información que te apoyará en tu proceso formativo, la información que necesitas a tu alcance.
                    </p>
                </div>

                <div className="md:w-1/2">
                    <img
                        src="/searchBooks.png"
                        alt="Vista de búsqueda de libros"
                        className="w-full rounded-xl  shadow-xl/30 "
                    />
                </div>
            </div>
        </section>
    );
};

export default LibraryInfo;
