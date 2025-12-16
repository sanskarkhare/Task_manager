import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://task-manager-afkr.onrender.com');

export default socket;
