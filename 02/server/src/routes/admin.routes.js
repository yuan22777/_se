import { Router } from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/users', adminController.getUsers);
router.post('/users', adminController.postUser);
router.post('/users/batch-import', adminController.postBatchImport);
router.delete('/users/:id', adminController.deleteUser);

router.get('/semesters', adminController.getSemesters);
router.post('/semesters', adminController.postSemester);
router.patch('/semesters/:id/activate', adminController.activateSemester);

router.get('/offerings', adminController.getOfferings);
router.post('/offerings', adminController.postOffering);
router.delete('/offerings/:id', adminController.deleteOffering);

router.get('/courses', adminController.getCourses);
router.post('/courses', adminController.postCourse);

export default router;