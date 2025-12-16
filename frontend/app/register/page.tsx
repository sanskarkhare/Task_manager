'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { register as registerUser, RegisterData, RegisterSchema } from '../../api/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
    });

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/dashboard');
        },
        onError: (error: any) => {
            alert(error.response?.data?.error || 'Registration failed');
        },
    });

    const onSubmit = (data: RegisterData) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            {...register('name')}
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            {...register('email')}
                            className="w-full p-2 border rounded mt-1"
                            type="email"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            {...register('password')}
                            className="w-full p-2 border rounded mt-1"
                            type="password"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div>
    );
}
