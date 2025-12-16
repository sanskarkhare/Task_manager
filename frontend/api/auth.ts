import client from './client';
import { z } from 'zod';

// We can share types if we export them from backend or redefine. 
// For simplicity, we redefine basic schemas or use `any` initially, but better to match.
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;

export const login = async (data: LoginData) => {
    const response = await client.post('/auth/login', data);
    return response.data;
};

export const register = async (data: RegisterData) => {
    const response = await client.post('/auth/register', data);
    return response.data;
};

export const getUsers = async () => {
    const response = await client.get('/auth/users');
    return response.data;
};
