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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
const socketHandler_1 = require("../socket/socketHandler");
const notification_service_1 = require("./notification.service");
class TaskService {
    constructor() {
        this.taskRepo = new task_repository_1.TaskRepository();
        this.notificationService = new notification_service_1.NotificationService();
    }
    create(data, creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepo.create(data, creatorId);
            // Notify all users about new task
            try {
                (0, socketHandler_1.getIO)().emit('taskCreated', task);
                // Notify assignee specifically
                if (task.assignedToId) {
                    // Persistent notification
                    yield this.notificationService.createNotification(task.assignedToId, `You have been assigned to task: ${task.title}`, task.id);
                }
            }
            catch (e) {
                console.error('Socket emit failed', e);
            }
            return task;
        });
    }
    getAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepo.findAll(filters);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepo.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepo.update(id, data);
            try {
                (0, socketHandler_1.getIO)().emit('taskUpdated', task);
                // Notify assignee if assignedToId changed
                if (task.assignedToId) { // Simplified check, ideally compare with old value
                    yield this.notificationService.createNotification(task.assignedToId, `Task updated/assigned: ${task.title}`, task.id);
                }
            }
            catch (e) {
                console.error('Socket emit failed', e);
            }
            return task;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepo.delete(id);
            try {
                (0, socketHandler_1.getIO)().emit('taskDeleted', id);
            }
            catch (e) {
                console.error('Socket emit failed', e);
            }
            return task;
        });
    }
}
exports.TaskService = TaskService;
