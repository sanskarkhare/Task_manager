import { z } from 'zod';

export const CreateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
