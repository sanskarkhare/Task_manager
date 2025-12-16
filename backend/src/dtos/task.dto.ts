import { z } from 'zod';
import { Priority, Status } from '@prisma/client';

export const CreateTaskSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string(),
    dueDate: z.string().datetime(), // Expecting ISO string
    priority: z.nativeEnum(Priority),
});

export const UpdateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    priority: z.nativeEnum(Priority).optional(),
    status: z.nativeEnum(Status).optional(),
    assignedToId: z.string().optional().nullable(),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
