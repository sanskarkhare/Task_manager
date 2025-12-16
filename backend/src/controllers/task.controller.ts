import { Response } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskSchema, UpdateTaskSchema } from '../dtos/task.dto';
import { AuthRequest } from '../middlewares/auth.middleware';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    create = async (req: AuthRequest, res: Response) => {
        try {
            if (!req.user) throw new Error('Unauthorized');
            const data = CreateTaskSchema.parse(req.body);
            const task = await this.taskService.create(data, req.user.id);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getAll = async (req: AuthRequest, res: Response) => {
        try {
            // filters from query (simplified)
            const filters = req.query as any;
            const tasks = await this.taskService.getAll(filters);
            res.json(tasks);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getById = async (req: AuthRequest, res: Response) => {
        try {
            const task = await this.taskService.getById(req.params.id);
            if (!task) return res.status(404).json({ error: 'Task not found' });
            res.json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req: AuthRequest, res: Response) => {
        try {
            const data = UpdateTaskSchema.parse(req.body);
            const task = await this.taskService.update(req.params.id, data);
            res.json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: AuthRequest, res: Response) => {
        try {
            await this.taskService.delete(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
