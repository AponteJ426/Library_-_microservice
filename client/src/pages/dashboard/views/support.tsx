import React, { useState } from 'react';
import { fetcher } from '../../../services/fetcher';
import { Mail, User, MessageSquare } from 'lucide-react';

const Support: React.FC = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetcher('/support/createSupport', {
                method: 'POST',
                body: formData,
            });

            setFormData({ nombre: '', correo: '', mensaje: '' });
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 1000);


        } catch (error) {
            console.error('Error al registrar el evento:', error);
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 1000);
        }
    };

    return (
        <>
            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center border border-green-200">
                        <h2 className="text-xl font-bold text-green-600 mb-2">✅ Evento enviado</h2>
                        <p className="text-gray-700">Gracias por tu reporte. ¡Lo hemos recibido con éxito!</p>
                    </div>
                </div>
            )}
            {/* Modal de error */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center border border-red-200">
                        <h2 className="text-xl font-bold text-red-600 mb-2">⚠️ Error al enviar</h2>
                        <p className="text-gray-700">Hubo un problema al registrar tu evento. Por favor, intenta nuevamente.</p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center p-6">
                <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-xl w-full border border-slate-200">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
                        📩 Registrar Evento
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                Nombre
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    id="name"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                    placeholder="Tu nombre completo"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    id="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                    placeholder="tucorreo@ejemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                                Mensaje
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                                <textarea
                                    id="message"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition resize-none"
                                    placeholder="Describe el evento que deseas reportar"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200 transform hover:scale-105"
                        >
                            Enviar Evento
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};


export default Support;
