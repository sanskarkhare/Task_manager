import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationAsRead } from '../api/notifications';
import { useEffect } from 'react';
import socket from '../utils/socket';

export const useNotifications = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications,
    });

    useEffect(() => {
        // Authenticate socket connection
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decode token payload manually to avoid dependency
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.userId) {
                    socket.emit('join', payload.userId);
                }
            } catch (e) {
                console.error('Failed to decode token for socket join', e);
            }
        }

        socket.on('notification', (notification) => {
            queryClient.setQueryData(['notifications'], (old: any) => {
                return [notification, ...(old || [])];
            });
        });

        return () => {
            socket.off('notification');
        };
    }, [queryClient]);

    const markRead = async (id: string) => {
        await markNotificationAsRead(id);
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
    };

    return { ...query, markRead };
};
