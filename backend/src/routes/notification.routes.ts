import { Router } from 'express';
import { getNotifications, markRead } from '../controllers/notification.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getNotifications);
router.patch('/:id/read', markRead);

export default router;
