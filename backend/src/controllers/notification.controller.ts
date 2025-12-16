import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

const notificationService = new NotificationService();

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId; // Assuming auth middleware adds user to req
        const notifications = await notificationService.getUserNotifications(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

export const markRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await notificationService.markAsRead(id);
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};
