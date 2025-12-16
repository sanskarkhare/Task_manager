import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { useEffect } from 'react';
import socket from '../utils/socket';

export const useTasks = (filters?: any) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['tasks', filters],
        queryFn: () => getTasks(filters),
    });

    useEffect(() => {
        socket.on('taskCreated', () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });
        socket.on('taskUpdated', () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });
        socket.on('taskDeleted', () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });
        socket.on('taskAssigned', (task) => {
            // Could show toast notification here
            console.log('Task assigned:', task);
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });

        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
            socket.off('taskAssigned');
        };
    }, [queryClient]);

    return query;
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};
