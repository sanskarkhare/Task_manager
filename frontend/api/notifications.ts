import client from './client';

export interface Notification {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    taskId?: string;
    userId: string;
}

export const getNotifications = async () => {
    const response = await client.get<Notification[]>('/notifications');
    return response.data;
};

export const markNotificationAsRead = async (id: string) => {
    const response = await client.patch<Notification>(`/notifications/${id}/read`);
    return response.data;
};
