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


export const UpdateProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
