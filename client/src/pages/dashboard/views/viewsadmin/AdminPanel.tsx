import React, { useState, useEffect } from 'react';
import { fetcher } from '../../../../services/fetcher';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
    totalUsuarios: number;
    totalEditoriales: number;
    totalLibros: number;
    totalUserRoles: { role: string; _count: number }[];
    registrosMensuales: { createdAt: string; _count: number }[];
}

const AdminPanel: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const data = await fetcher('/admin/stats');
                setStats(data?.stats);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Cargando estadísticas...</p>;
    }

    const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

    const pieData = stats?.totalUserRoles?.map((role) => ({
        name: role.role,
        value: role._count,
    })) || [];

    const barData = stats?.registrosMensuales?.reduce((acc, item) => {
        const month = new Date(item.createdAt).toLocaleString('default', { month: 'long' });
        const existingMonth = acc.find(entry => entry.month === month);

        if (existingMonth) {
            existingMonth.users += item._count;
        } else {
            acc.push({ month, users: item._count });
        }

        return acc;
    }, [] as { month: string; users: number }[]) || [];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Panel de Administración</h1>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow rounded-lg p-5">
                    <p className="text-sm text-gray-500">Total Usuarios</p>
                    <p className="text-2xl font-bold text-gray-800">{stats?.totalUsuarios || 0}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-5">
                    <p className="text-sm text-gray-500">Total Editoriales</p>
                    <p className="text-2xl font-bold text-gray-800">{stats?.totalEditoriales || 0}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-5">
                    <p className="text-sm text-gray-500">Total Libros</p>
                    <p className="text-2xl font-bold text-gray-800">{stats?.totalLibros || 0}</p>
                </div>
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gráfico de pastel */}
                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Distribución de Usuarios por Rol</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico de barras */}
                <div className="bg-white shadow rounded-lg p-5">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Registros Mensuales</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#0ea5e9" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
