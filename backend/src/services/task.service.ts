import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { getIO } from '../socket/socketHandler';
import { Status, Priority } from '@prisma/client';
import { NotificationService } from './notification.service';

export class TaskService {
    private taskRepo: TaskRepository;
    private notificationService: NotificationService;

    constructor() {
        this.taskRepo = new TaskRepository();
        this.notificationService = new NotificationService();
    }

    async create(data: CreateTaskDto, creatorId: string) {
        const task = await this.taskRepo.create(data, creatorId);

        // Notify all users about new task
        try {
            getIO().emit('taskCreated', task);

            // Notify assignee specifically
            if (task.assignedToId) {
                // Persistent notification
                await this.notificationService.createNotification(
                    task.assignedToId,
                    `You have been assigned to task: ${task.title}`,
                    task.id
                );
            }
        } catch (e) { console.error('Socket emit failed', e); }

        return task;
    }

    async getAll(filters: { status?: Status; priority?: Priority; assignedToId?: string; creatorId?: string }) {
        return this.taskRepo.findAll(filters);
    }

    async getById(id: string) {
        return this.taskRepo.findById(id);
    }

    async update(id: string, data: UpdateTaskDto) {
        const task = await this.taskRepo.update(id, data);

        try {
            getIO().emit('taskUpdated', task);

            // Notify assignee if assignedToId changed
            if (task.assignedToId) { // Simplified check, ideally compare with old value
                await this.notificationService.createNotification(
                    task.assignedToId,
                    `Task updated/assigned: ${task.title}`,
                    task.id
                );
            }
        } catch (e) { console.error('Socket emit failed', e); }

        return task;
    }

    async delete(id: string) {
        const task = await this.taskRepo.delete(id);
        try {
            getIO().emit('taskDeleted', id);
        } catch (e) { console.error('Socket emit failed', e); }
        return task;
    }
}
