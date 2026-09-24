import { Router } from 'express';
import * as teacherController from '../controllers/teacher.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate, authorize('TEACHER'));

router.get('/offerings', teacherController.getOfferings);
router.get('/offerings/:id/students', teacherController.getOfferingStudents);
router.post('/offerings/:id/scores', teacherController.postScores);

export default router;