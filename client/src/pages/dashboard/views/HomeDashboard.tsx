import React from 'react';

const HomeDashboard: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="relative z-10 p-8">

                {/* Hero Section */}
                <header className="text-center py-16">
                    <div className="flex justify-space-evenly  justify-center ">
                        <h1 className="text-6xl font-extrabold text-white drop-shadow-md mb-6">
                            Bienvenido a SapienSS
                        </h1>
                        <div className="">
                            <img
                                src="/sapiens_2.png"
                                alt="Imagen de bienvenida"
                                className=" w-full max-w-12 rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                    <p className="text-white/80 text-lg mb-2">
                        Descubre cómo nuestra plataforma puede transformar la manera en que gestionas
                    </p>
                    <p className="text-white/70 mb-6">
                        tus proyectos, colaboras con tu equipo y alcanzas tus objetivos.
                    </p>

                </header>

                {/* Beneficios Clave */}
                <section className="py-16 bg-white text-gray-800 rounded-t-3xl">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">Beneficios Clave</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Ahorro de Tiempo", desc: "Optimiza tus procesos y reduce el tiempo dedicado a tareas repetitivas." },
                                { title: "Colaboración Efectiva", desc: "Mejora la comunicación y el trabajo en equipo con herramientas integradas." },
                                { title: "Resultados Tangibles", desc: "Alcanza tus objetivos más rápido con nuestra plataforma intuitiva." }
                            ].map((item, index) => (
                                <div key={index} className="bg-gradient-to-br from-sky-100 to-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-semibold text-sky-700 mb-4">{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonios de Usuarios */}
                <section className="py-16 bg-sky-50 text-gray-800">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">Lo Que Dicen Nuestros Usuarios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { quote: "Esta app ha cambiado la forma en que gestiono mis proyectos. ¡Es increíblemente eficiente!", author: "Juan Pérez" },
                                { quote: "Gracias a esta plataforma, mi equipo y yo estamos más sincronizados que nunca.", author: "María López" },
                                { quote: "La seguridad y facilidad de uso son insuperables. ¡Altamente recomendada!", author: "Carlos García" }
                            ].map((testimony, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-sky-100">
                                    <p className="italic text-sky-900">"{testimony.quote}"</p>
                                    <p className="mt-4 font-bold text-sky-600">- {testimony.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Conoce al Equipo */}
                <section className="py-16 bg-white text-gray-800">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">Conoce al Equipo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    name: "Juan Aponte",
                                    role: "dev Full-Stack",
                                    img: "/aponte.png",
                                    linkedin: "https://www.linkedin.com/in/juan-camilo-aponte-palacio-76b056188"
                                },
                                {
                                    name: "Sebastian Perdomo",
                                    role: "dev Frontend",
                                    img: "/perdomo.jpg",
                                    linkedin: "https://www.linkedin.com/in/johan-sebastian-perdomo-diaz-a0a289232"
                                }
                            ].map((member, i) => (
                                <div key={i} className="text-center mt-6">
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block transform transition-transform hover:scale-105"
                                    >
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg ring-4 ring-sky-300"
                                        />
                                    </a>
                                    <h3 className="text-xl font-semibold">{member.name}</h3>
                                    <p className="text-gray-600">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <footer className=" text-center mt-40 ">
                    <h2 className="text-4xl font-bold mb-6 text-sky-800">¿Listo para Comenzar?</h2>
                    <p className="text-lg font-light mb-8 text-sky-700">
                        © {new Date().getFullYear()} @JASP. Todos los derechos reservados.</p>

                </footer>


            </div>
        </div>
    );
};

export default HomeDashboard;
