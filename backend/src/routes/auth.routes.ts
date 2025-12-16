import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

router.get('/me', authenticate, controller.getProfile);
router.put('/me', authenticate, controller.updateProfile);

export default router;
