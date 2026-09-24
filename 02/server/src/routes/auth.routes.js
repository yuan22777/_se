import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.post('/login', authController.login);
router.post('/reset-password', authenticate, authController.resetPassword);
router.get('/me', authenticate, authController.me);

export default router;