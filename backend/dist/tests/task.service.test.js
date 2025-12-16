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
const task_service_1 = require("../services/task.service");
const task_repository_1 = require("../repositories/task.repository");
const socketHandler_1 = require("../socket/socketHandler");
jest.mock('../repositories/task.repository');
jest.mock('../socket/socketHandler');
describe('TaskService', () => {
    let service;
    let ioMock;
    beforeEach(() => {
        jest.clearAllMocks();
        ioMock = {
            emit: jest.fn(),
            to: jest.fn().mockReturnThis()
        };
        socketHandler_1.getIO.mockReturnValue(ioMock);
        service = new task_service_1.TaskService();
    });
    describe('create', () => {
        it('should create a task and emit taskCreated event', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskData = {
                title: 'Test Task',
                description: 'Description',
                dueDate: '2025-12-31',
                priority: 'LOW'
            };
            const expectedTask = Object.assign(Object.assign({}, taskData), { id: '1', creatorId: 'creator1', assignee: null, creator: null });
            task_repository_1.TaskRepository.prototype.create.mockResolvedValue(expectedTask);
            const result = yield service.create(taskData, 'creator1');
            expect(result).toEqual(expectedTask);
            expect(task_repository_1.TaskRepository.prototype.create).toHaveBeenCalledTimes(1);
            expect(socketHandler_1.getIO).toHaveBeenCalled();
            expect(ioMock.emit).toHaveBeenCalledWith('taskCreated', expectedTask);
        }));
    });
    describe('update', () => {
        it('should update task and emit taskUpdated event', () => __awaiter(void 0, void 0, void 0, function* () {
            const updateData = { status: 'COMPLETED' };
            const updatedTask = { id: '1', title: 'Test', status: 'COMPLETED' };
            task_repository_1.TaskRepository.prototype.update.mockResolvedValue(updatedTask);
            const result = yield service.update('1', updateData);
            expect(result).toEqual(updatedTask);
            expect(task_repository_1.TaskRepository.prototype.update).toHaveBeenCalledWith('1', updateData);
            expect(ioMock.emit).toHaveBeenCalledWith('taskUpdated', updatedTask);
        }));
    });
    describe('delete', () => {
        it('should delete task and emit taskDeleted event', () => __awaiter(void 0, void 0, void 0, function* () {
            task_repository_1.TaskRepository.prototype.delete.mockResolvedValue({ id: '1' });
            yield service.delete('1');
            expect(task_repository_1.TaskRepository.prototype.delete).toHaveBeenCalledWith('1');
            expect(ioMock.emit).toHaveBeenCalledWith('taskDeleted', '1');
        }));
    });
});
