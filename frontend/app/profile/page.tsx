'use client';

import { useState, useEffect } from 'react';
import client from '@/api/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await client.get('/auth/me');
            setUser(res.data);
            setName(res.data.name || '');
        } catch (error) {
            console.error('Failed to fetch profile', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage('');
        try {
            const res = await client.put('/auth/me', { name });
            setUser(res.data);

            // Update localStorage so other components reflect the change
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...currentUser, ...res.data }));

            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile', error);
            setMessage('Failed to update profile.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="max-w-md bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                    <div className="text-lg">{user?.email}</div>
                </div>

                <form onSubmit={handleUpdate}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    {message && (
                        <div className={`mb-4 text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={updating}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                        >
                            {updating ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
