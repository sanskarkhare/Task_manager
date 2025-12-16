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
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const task_dto_1 = require("../dtos/task.dto");
class TaskController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user)
                    throw new Error('Unauthorized');
                const data = task_dto_1.CreateTaskSchema.parse(req.body);
                const task = yield this.taskService.create(data, req.user.id);
                res.status(201).json(task);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // filters from query (simplified)
                const filters = req.query;
                const tasks = yield this.taskService.getAll(filters);
                res.json(tasks);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.getById(req.params.id);
                if (!task)
                    return res.status(404).json({ error: 'Task not found' });
                res.json(task);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = task_dto_1.UpdateTaskSchema.parse(req.body);
                const task = yield this.taskService.update(req.params.id, data);
                res.json(task);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.taskService.delete(req.params.id);
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.taskService = new task_service_1.TaskService();
    }
}
exports.TaskController = TaskController;
