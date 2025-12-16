import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import notificationRoutes from './routes/notification.routes';
import { initSocket } from './socket/socketHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.send('Task Manager API');
});

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
