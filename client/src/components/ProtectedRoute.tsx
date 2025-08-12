import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/auth/verify', {
                    method: 'GET',
                    credentials: 'include', // 👈 envía la cookie
                });

                if (res.ok) {
                    console.log(res.status);
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error('Error verificando sesión:', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <p className="text-center mt-10">Verificando sesión...</p>;

    return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
