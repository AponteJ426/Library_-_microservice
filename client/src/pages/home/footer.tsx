// components/Footer.jsx

const Footer = () => {
    return (
        <footer className="bg-[#06141f] text-white px-6 py-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between space-y-10 md:space-y-0">

                {/* Secciones */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-cyan-400 font-semibold mb-2">Plataforma</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Iniciar sesión</a></li>
                            <li><a href="#">Registrarse</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-cyan-400 font-semibold mb-2">Aprende</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#">Contacto</a></li>
                            <li><a href="#">Soporte</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Preguntas frecuentes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-cyan-400 font-semibold mb-2">Políticas</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#">Privacidad</a></li>
                            <li><a href="#">Seguridad</a></li>
                            <li><a href="#">Términos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-cyan-400 font-semibold mb-2">Social</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#">YouTube</a></li>
                            <li><a href="#">Noticias</a></li>
                            <li><a href="#">TikTok</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                </div>

                {/* Descripción */}
                <div className="md:ml-12 max-w-md">
                    <h3 className="text-2xl font-bold text-white mb-2">SAPIENS</h3>
                    <p className="text-sm text-gray-300">
                        Ya sea que tengas 50 ítems o 5.000, tu biblioteca es valiosa. Con SAPIENS, administrar tu biblioteca privada de libros es muy fácil. Crea tu cuenta hoy mismo.
                    </p>
                </div>
            </div>

            {/* Derechos reservados */}
            <div className="text-center mt-10 text-sm text-gray-400">
                © sapiens.com @JASP / Todos los derechos reservados
            </div>
        </footer>
    );
};

export default Footer;
