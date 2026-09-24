import { Router } from 'express';
import * as studentController from '../controllers/student.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate, authorize('STUDENT'));

router.get('/offerings', studentController.getOfferings);
router.post('/enrollments', studentController.postEnrollment);
router.delete('/enrollments/:offeringId', studentController.deleteEnrollment);
router.get('/schedule', studentController.getSchedule);
router.get('/grades', studentController.getGrades);

export default router;