import client from './client';
import { z } from 'zod';

// Reuse DTOs concept or redefine
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    status: 'TO_DO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
    creatorId: string;
    assignedToId?: string;
    creator?: any;
    assignee?: any;
}

export const getTasks = async (filters?: any) => {
    const validFilters = Object.fromEntries(
        Object.entries(filters || {}).filter(([_, v]) => v != null)
    ) as Record<string, string>;
    const params = new URLSearchParams(validFilters).toString();
    const response = await client.get(`/tasks?${params}`);
    return response.data;
};

export const createTask = async (data: any) => {
    const response = await client.post('/tasks', data);
    return response.data;
};

export const updateTask = async (id: string, data: any) => {
    const response = await client.put(`/tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: string) => {
    await client.delete(`/tasks/${id}`);
};
