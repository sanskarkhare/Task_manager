import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const controller = new TaskController();

router.use(authenticate); // Protect all routes

router.post('/', controller.create as any);
router.get('/', controller.getAll as any);
router.get('/:id', controller.getById as any);
router.put('/:id', controller.update as any);
router.delete('/:id', controller.delete as any);

export default router;
