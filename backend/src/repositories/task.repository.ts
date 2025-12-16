import prisma from '../config/db';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { Task, Status, Priority } from '@prisma/client';

export class TaskRepository {
    async create(data: CreateTaskDto, creatorId: string): Promise<Task> {
        return prisma.task.create({
            data: {
                ...data,
                dueDate: new Date(data.dueDate as string),
                creatorId,
            },
            include: { assignee: true, creator: true },
        });
    }

    async findAll(filters?: { status?: Status; priority?: Priority; assignedToId?: string; creatorId?: string }) {
        const where: any = {};
        if (filters?.status) where.status = filters.status;
        if (filters?.priority) where.priority = filters.priority;
        if (filters?.assignedToId) where.assignedToId = filters.assignedToId;
        if (filters?.creatorId) where.creatorId = filters.creatorId;

        return prisma.task.findMany({
            where,
            orderBy: { dueDate: 'asc' },
            include: { assignee: true, creator: true },
        });
    }

    async findById(id: string): Promise<Task | null> {
        return prisma.task.findUnique({
            where: { id },
            include: { assignee: true, creator: true },
        });
    }

    async update(id: string, data: UpdateTaskDto): Promise<Task> {
        const updateData: any = { ...data };
        if (data.dueDate) updateData.dueDate = new Date(data.dueDate as string);

        return prisma.task.update({
            where: { id },
            data: updateData,
            include: { assignee: true, creator: true },
        });
    }

    async delete(id: string): Promise<Task> {
        return prisma.task.delete({
            where: { id },
        });
    }
}
