import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { fetcher } from '../../services/fetcher';

// Esquema de validación con mensajes en español latino
const schema = yup.object({
    email: yup
        .string()
        .email('Ingresa un correo válido')
        .required('El correo electrónico es obligatorio'),
    password: yup
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    rememberMe: yup.boolean(),
});

type FormData = {
    email: string;
    password: string;
    rememberMe?: boolean;
};


const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await fetcher('/auth/login', {
                method: 'POST',
                body: {
                    email: data.email,
                    password: data.password,
                },
            });

            // Si no hay error, la cookie ya está guardada, redirige al dashboard
            navigate('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al iniciar sesión:', error.message);
            } else {
                console.error('Error al iniciar sesión:', error);
            }
            alert('Credenciales incorrectas o error del servidor');
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-xl font-semibold mb-6">
                    <span className="font-bold">SAPIENS</span> Iniciar sesión:
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full border p-3 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full border p-3 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none"
                            {...register('password')}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            {...register('rememberMe')}
                            className="w-4 h-4"
                        />
                        <label className="text-sm">Mantener sesión activa</label>
                    </div>

                    <Button
                        type="submit"
                        sx={{ backgroundColor: '#00BCD4', color: 'white' }}
                        className="w-full  font-semibold py-2 rounded-md  "
                    >
                        Iniciar sesión
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register">
                        <a className="text-cyan-500 hover:underline">
                            ¡Regístrate!
                        </a>
                    </Link>
                </p>
                <p className="mt-2 text-center text-sm">
                    ¿Olvidaste tu contraseña?{' '}
                    <a href="#" className="text-cyan-500 hover:underline">
                        Recuperar contraseña
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
