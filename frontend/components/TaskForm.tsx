'use client';

import { useForm } from 'react-hook-form';
import { useCreateTask, useUpdateTask } from '../hooks/useTasks';
import { useEffect } from 'react';

interface TaskFormProps {
    task?: any;
    onClose: () => void;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: task || {
            title: '',
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
            priority: 'LOW',
        },
    });

    useEffect(() => {
        if (task) {
            reset({ ...task, dueDate: task.dueDate.split('T')[0] });
        }
    }, [task, reset]);

    const onSubmit = (data: any) => {
        const payload = { ...data, dueDate: new Date(data.dueDate).toISOString() };
        if (task) {
            updateTask.mutate({ id: task.id, data: payload }, { onSuccess: onClose });
        } else {
            createTask.mutate(payload, { onSuccess: onClose });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input {...register('title')} placeholder="Title" className="w-full border p-2 rounded" required />
                    <textarea {...register('description')} placeholder="Description" className="w-full border p-2 rounded" />
                    <input type="date" {...register('dueDate')} className="w-full border p-2 rounded" required />
                    <select {...register('priority')} className="w-full border p-2 rounded">
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                    </select>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
