import * as adminService from '../services/admin.service.js';

async function handle(res, fn) {
  try {
    const result = await fn();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || '伺服器內部錯誤' });
  }
}

export const getUsers = (req, res) => handle(res, () => adminService.listUsers(req.query));

export const postUser = (req, res) => handle(res, () => adminService.createUser(req.body));

export const postBatchImport = (req, res) => handle(res, () => adminService.batchImportUsers(req.body.rows || req.body));

export const deleteUser = (req, res) => handle(res, () => adminService.deleteUser(Number(req.params.id)));

export const getSemesters = (req, res) => handle(res, () => adminService.listSemesters());

export const postSemester = (req, res) => handle(res, () => adminService.createSemester(req.body));

export const activateSemester = (req, res) => handle(res, () => adminService.activateSemester(Number(req.params.id)));

export const getOfferings = (req, res) => handle(res, () => adminService.listOfferings());

export const postOffering = (req, res) => handle(res, () => adminService.createOffering(req.body));

export const deleteOffering = (req, res) => handle(res, () => adminService.deleteOffering(Number(req.params.id)));

export const getCourses = (req, res) => handle(res, () => adminService.listCourses());

export const postCourse = (req, res) => handle(res, () => adminService.createCourse(req.body));