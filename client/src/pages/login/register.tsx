import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { fetcher } from '../../services/fetcher';

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

type FormData = {
    nombre: string;
    email: string;
    password: string;
};

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            await fetcher('/auth/register', {
                method: 'POST',
                body: data,
            });

            // Si el registro fue exitoso, la cookie ya está guardada
            navigate('/dashboard');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error al registrarse:', error.message);
            alert(error.message || 'Hubo un error. Intenta más tarde.');
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            {...register('nombre')}
                            className="w-full p-3 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            {...register('email')}
                            className="w-full p-3 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            {...register('password')}
                            className="w-full p-3 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login">
                        <a className="text-cyan-600 hover:underline">Iniciar sesión</a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
