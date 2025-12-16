import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserSchema, LoginSchema, UpdateProfileSchema } from '../dtos/auth.dto';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const data = CreateUserSchema.parse(req.body);
            const { user, token } = await this.authService.register(data);
            res.status(201).json({ user, token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const data = LoginSchema.parse(req.body);
            const { user, token } = await this.authService.login(data);
            res.json({ user, token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.authService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    getProfile = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const user = await this.authService.getProfile(userId);
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    updateProfile = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const data = UpdateProfileSchema.parse(req.body);
            const user = await this.authService.updateProfile(userId, data);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
