import * as gradeService from '../services/grade.service.js';

async function handle(res, fn) {
  try {
    const result = await fn();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || '伺服器內部錯誤' });
  }
}

export const getOfferings = (req, res) => handle(res, () => gradeService.listTeacherOfferings(req.user.userId));

export const getOfferingStudents = (req, res) => handle(res, () =>
  gradeService.listOfferingStudents(req.user.userId, Number(req.params.id))
);

export const postScores = (req, res) => handle(res, () => {
  const { grades } = req.body || {};
  if (!Array.isArray(grades)) {
    const err = new Error('請提供 grades 陣列');
    err.status = 400;
    throw err;
  }
  return gradeService.batchUpdateScores(req.user.userId, Number(req.params.id), grades);
});