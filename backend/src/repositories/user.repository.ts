import prisma from '../config/db';
import { CreateUserDto } from '../dtos/auth.dto';
import { User } from '@prisma/client';

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async create(data: CreateUserDto): Promise<User> {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password, // hashed password should be passed here
                name: data.name,
            },
        });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany({
            select: { id: true, name: true, email: true, password: false, createdAt: true, updatedAt: true }
            // @ts-ignore
        }) as User[];
    }
}
