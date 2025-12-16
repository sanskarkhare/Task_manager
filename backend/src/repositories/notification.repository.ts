import { PrismaClient, Notification } from '@prisma/client';

const prisma = new PrismaClient();

export class NotificationRepository {
    async create(data: { userId: string; message: string; taskId?: string }) {
        return prisma.notification.create({
            data,
        });
    }

    async findByUserId(userId: string) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsRead(id: string) {
        return prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
}
