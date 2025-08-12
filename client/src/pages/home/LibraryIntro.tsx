
const LibraryIntro = () => {
    return (
        <section className="bg-[#D6F2F7] text-center  py-20 max-h-200">
            <div className="flex justify-center mb-10 flex-col items-center w-full">
                <img
                    src={"/preview.png"}
                    alt="Vista previa de Sapiens"
                    className="rounded-xl  w-full max-w-4xl shadow-xs "
                    style={{ transform: 'translateY(-180px)' }}
                />

                <div className="transform translate-y-[-200px]">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Busca, analiza y aprende con nuestros libros
                    </h2>

                    <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg mb-8">
                        Nuestro servicio de gestión de bibliotecas atiende a bibliotecas, escuelas, organizaciones y catálogos residenciales. Nuestro software en línea le permite buscar múltiples colecciones de libros de distintos temas educativos.
                    </p>

                    <button className="bg-[#59CCDB] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#47b2c3] transition duration-300">
                        Comenzar
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LibraryIntro;
