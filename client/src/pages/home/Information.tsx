export const Information = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-white text-center  gap-16">

            {/* Sección 1: Promoción */}
            <section className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-blue-100 to-white rounded-xl shadow p-8">
                <div className="flex-1 text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        MÁS 200 LIBROS SON PARTE DE <br /> NUESTRA PLATAFORMA
                    </h2>
                    <p className="text-lg text-gray-600 mt-4">
                        Te invitamos a ser partícipe de nuestro servicio
                    </p>
                </div>
                <div className="width: 100% flex-1 flex justify-center items-center rounded-xg">
                    <img
                        src="/ChildrenRead.png"
                        alt="Niña feliz con libros"
                        className="w-full max-w-xs rounded-lg"
                    />
                </div>
            </section>
        </div>
    );
};
