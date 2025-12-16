import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, LoginDto } from '../dtos/auth.dto';
import { signToken } from '../config/jwt';
import { User } from '@prisma/client';

export class AuthService {
    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async register(data: CreateUserDto): Promise<{ user: User; token: string }> {
        const existing = await this.userRepo.findByEmail(data.email);
        if (existing) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepo.create({ ...data, password: hashedPassword });
        const token = signToken({ id: user.id });

        return { user, token };
    }

    async login(data: LoginDto): Promise<{ user: User; token: string }> {
        const user = await this.userRepo.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) {
            throw new Error('Invalid credentials');
        }

        const token = signToken({ id: user.id });
        return { user, token };
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepo.findAll();
    }
}
