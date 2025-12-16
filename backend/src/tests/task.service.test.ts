import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';
import { getIO } from '../socket/socketHandler';

jest.mock('../repositories/task.repository');
jest.mock('../socket/socketHandler');

describe('TaskService', () => {
    let service: TaskService;
    let ioMock: any;

    beforeEach(() => {
        jest.clearAllMocks();

        ioMock = {
            emit: jest.fn(),
            to: jest.fn().mockReturnThis()
        };
        (getIO as jest.Mock).mockReturnValue(ioMock);

        service = new TaskService();
    });

    describe('create', () => {
        it('should create a task and emit taskCreated event', async () => {
            const taskData = {
                title: 'Test Task',
                description: 'Description',
                dueDate: '2025-12-31' as any,
                priority: 'LOW' as any
            };

            const expectedTask = { ...taskData, id: '1', creatorId: 'creator1', assignee: null, creator: null };

            (TaskRepository.prototype.create as jest.Mock).mockResolvedValue(expectedTask);

            const result = await service.create(taskData, 'creator1');

            expect(result).toEqual(expectedTask);
            expect(TaskRepository.prototype.create).toHaveBeenCalledTimes(1);
            expect(getIO).toHaveBeenCalled();
            expect(ioMock.emit).toHaveBeenCalledWith('taskCreated', expectedTask);
        });
    });

    describe('update', () => {
        it('should update task and emit taskUpdated event', async () => {
            const updateData = { status: 'COMPLETED' as any };
            const updatedTask = { id: '1', title: 'Test', status: 'COMPLETED' };

            (TaskRepository.prototype.update as jest.Mock).mockResolvedValue(updatedTask);

            const result = await service.update('1', updateData);

            expect(result).toEqual(updatedTask);
            expect(TaskRepository.prototype.update).toHaveBeenCalledWith('1', updateData);
            expect(ioMock.emit).toHaveBeenCalledWith('taskUpdated', updatedTask);
        });
    });

    describe('delete', () => {
        it('should delete task and emit taskDeleted event', async () => {
            (TaskRepository.prototype.delete as jest.Mock).mockResolvedValue({ id: '1' });

            await service.delete('1');

            expect(TaskRepository.prototype.delete).toHaveBeenCalledWith('1');
            expect(ioMock.emit).toHaveBeenCalledWith('taskDeleted', '1');
        });
    });
});
