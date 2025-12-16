'use client';

import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { Task } from '../api/tasks';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
    const deleteTask = useDeleteTask();
    const updateTask = useUpdateTask();

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateTask.mutate({ id: task.id, data: { status: e.target.value } });
    };

    return (
        <div className="p-4 bg-white rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-700">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${task.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                    task.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                    }`}>
                    {task.priority}
                </span>
            </div>
            <p className="text-gray-800 mt-2 text-sm">{task.description}</p>
            {task.assignee && (
                <div className="mt-2 text-sm text-gray-700">
                    <span className="font-medium text-gray-900">Assigned to:</span> {task.assignee.name || task.assignee.email}
                </div>
            )}
            <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-700">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <select
                    value={task.status}
                    onChange={handleStatusChange}
                    className="border rounded p-1 text-xs text-gray-900"
                >
                    <option value="TO_DO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button onClick={() => onEdit(task)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => deleteTask.mutate(task.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
        </div>
    );
}
