"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskSchema = exports.CreateTaskSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string(),
    dueDate: zod_1.z.string().datetime(), // Expecting ISO string
    priority: zod_1.z.nativeEnum(client_1.Priority),
});
exports.UpdateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.string().datetime().optional(),
    priority: zod_1.z.nativeEnum(client_1.Priority).optional(),
    status: zod_1.z.nativeEnum(client_1.Status).optional(),
    assignedToId: zod_1.z.string().optional().nullable(),
});
