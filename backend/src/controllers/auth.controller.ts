import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserSchema, LoginSchema } from '../dtos/auth.dto';

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
}
