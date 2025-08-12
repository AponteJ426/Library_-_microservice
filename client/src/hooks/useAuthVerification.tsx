// hooks/useAuthVerification.ts
import { useEffect, useState } from 'react';

export const useAuthVerification = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/auth/verify', {
                    method: 'GET',
                    credentials: 'include', // Incluye cookies
                });

                setUser(res.ok ? await res.json() : null);
            } catch (error) {
                console.error('Error verificando sesión:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { loading, user };
};
