import { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';

export default function NotificationList() {
    const { data: notifications, isLoading, markRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications?.filter((n: any) => !n.isRead).length || 0;

    const handleMarkRead = (id: string) => {
        markRead(id);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
                {/* Bell Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                    <div className="py-2">
                        <div className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                            Notifications
                        </div>
                        {isLoading ? (
                            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                        ) : notifications?.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
                        ) : (
                            <div className="max-h-64 overflow-y-auto">
                                {notifications?.map((notification: any) => (
                                    <div
                                        key={notification.id}
                                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.isRead ? 'bg-blue-50 dark:bg-gray-900 border-l-4 border-blue-500' : ''
                                            }`}
                                        onClick={() => !notification.isRead && handleMarkRead(notification.id)}
                                    >
                                        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
