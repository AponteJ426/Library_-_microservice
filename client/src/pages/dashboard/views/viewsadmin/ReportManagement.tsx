import React, { useEffect, useState } from 'react';
import { fetcher } from '../../../../services/fetcher';
import { Trash2 } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import dayjs from 'dayjs';

interface Reporte {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
    fecha_creacion?: string; // Asegúrate de que tu backend incluya esto
}

const SupportList: React.FC = () => {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        obtenerReportes();
    }, []);

    const obtenerReportes = async () => {
        try {
            const data = await fetcher('/support/getSupports', { method: 'GET' });
            setReportes(data);
            console.log(data);
        } catch (error) {
            console.error('Error al obtener reportes:', error);
        }
    };

    const eliminarReporte = async (id: number) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este reporte?')) return;
        try {
            await fetcher(`/support/deleteSupport/${id}`, { method: 'DELETE' });
            setReportes(prev => prev.filter(r => r.id !== id));
            setSuccessMessage('✅ Reporte eliminado correctamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error al eliminar reporte:', error);
        }
    };

    // Agrupar reportes por día
    const reportesPorDia = reportes.reduce((acc: Record<string, number>, reporte) => {
        const fecha = dayjs(reporte.fecha_creacion).format('YYYY-MM-DD');
        acc[fecha] = (acc[fecha] || 0) + 1;
        return acc;
    }, {});

    const datosGrafico = Object.entries(reportesPorDia).map(([fecha, cantidad]) => ({
        fecha,
        cantidad,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 py-10 px-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">📄 Reportes de Soporte</h1>

            {successMessage && (
                <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg shadow-sm transition-all duration-500">
                    {successMessage}
                </div>
            )}

            {/* Gráfico de barras */}
            <div className="w-full max-w-5xl mb-8 bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">📊 Reportes por día</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={datosGrafico}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fecha" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="cantidad" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Tabla de reportes */}
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Correo</th>
                            <th className="px-6 py-3">Mensaje</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reportes.map((reporte) => (
                            <tr key={reporte.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">{reporte.nombre}</td>
                                <td className="px-6 py-4">{reporte.correo}</td>
                                <td className="px-6 py-4">{reporte.mensaje}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => eliminarReporte(reporte.id)}
                                        className="text-red-500 hover:text-red-700 transition p-1 rounded-full hover:bg-red-100"
                                        title="Eliminar reporte"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {reportes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    No hay reportes disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupportList;
