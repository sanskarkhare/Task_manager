import { NotificationRepository } from '../repositories/notification.repository';
import { getIO } from '../socket/socketHandler';

export class NotificationService {
    private notificationRepo: NotificationRepository;

    constructor() {
        this.notificationRepo = new NotificationRepository();
    }

    async createNotification(userId: string, message: string, taskId?: string) {
        const notification = await this.notificationRepo.create({ userId, message, taskId });

        // Emit real-time notification
        try {
            getIO().to(userId).emit('notification', notification);
        } catch (e) {
            console.error('Socket notification emit failed', e);
        }

        return notification;
    }

    async getUserNotifications(userId: string) {
        return this.notificationRepo.findByUserId(userId);
    }

    async markAsRead(id: string) {
        return this.notificationRepo.markAsRead(id);
    }
}
