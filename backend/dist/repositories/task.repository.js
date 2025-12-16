"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const db_1 = __importDefault(require("../config/db"));
class TaskRepository {
    create(data, creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.default.task.create({
                data: Object.assign(Object.assign({}, data), { dueDate: new Date(data.dueDate), creatorId }),
                include: { assignee: true, creator: true },
            });
        });
    }
    findAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (filters === null || filters === void 0 ? void 0 : filters.status)
                where.status = filters.status;
            if (filters === null || filters === void 0 ? void 0 : filters.priority)
                where.priority = filters.priority;
            if (filters === null || filters === void 0 ? void 0 : filters.assignedToId)
                where.assignedToId = filters.assignedToId;
            if (filters === null || filters === void 0 ? void 0 : filters.creatorId)
                where.creatorId = filters.creatorId;
            return db_1.default.task.findMany({
                where,
                orderBy: { dueDate: 'asc' },
                include: { assignee: true, creator: true },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.default.task.findUnique({
                where: { id },
                include: { assignee: true, creator: true },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = Object.assign({}, data);
            if (data.dueDate)
                updateData.dueDate = new Date(data.dueDate);
            return db_1.default.task.update({
                where: { id },
                data: updateData,
                include: { assignee: true, creator: true },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.default.task.delete({
                where: { id },
            });
        });
    }
}
exports.TaskRepository = TaskRepository;
