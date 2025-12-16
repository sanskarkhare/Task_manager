'use client';

import { useState, useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskCard from '../../components/TaskCard';
import TaskForm from '../../components/TaskForm';
import { useRouter } from 'next/navigation';
import NotificationList from '../../components/NotificationList';

export default function DashboardPage() {
    const router = useRouter();
    const [filters, setFilters] = useState({ status: '', priority: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserName(user.name || 'User');
            } catch (e) {
                console.error('Failed to parse user', e);
            }
        }
    }, []);

    const { data: tasks, isLoading } = useTasks({
        ...filters,
        status: filters.status || undefined, // clear empty strings
        priority: filters.priority || undefined,
    });

    const handleEdit = (task: any) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-950">
                        My Dashboard {userName && <span className="text-blue-600">({userName})</span>}
                    </h1>
                    <div className="flex items-center gap-4">
                        <NotificationList />
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                router.push('/login');
                            }}
                            className="text-sm text-gray-900 hover:text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900 mb-1">Status</label>
                        <select
                            className="border rounded p-2 w-full text-gray-900"
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="">All Statuses</option>
                            <option value="TO_DO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="REVIEW">Review</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-900 mb-1">Priority</label>
                        <select
                            className="border rounded p-2 w-full text-gray-900"
                            value={filters.priority}
                            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                        >
                            <option value="">All Priorities</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                            <option value="URGENT">Urgent</option>
                        </select>
                    </div>
                    <button
                        onClick={handleNew}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 h-10"
                    >
                        + New Task
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks?.map((task: any) => (
                            <TaskCard key={task.id} task={task} onEdit={handleEdit} />
                        ))}
                        {tasks?.length === 0 && (
                            <p className="text-gray-800 col-span-full text-center py-10">No tasks found. Create one to get started!</p>
                        )}
                    </div>
                )}

                {isModalOpen && (
                    <TaskForm
                        task={editingTask}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
