import * as enrollmentService from '../services/enrollment.service.js';

async function handle(res, fn) {
  try {
    const result = await fn();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || '伺服器內部錯誤' });
  }
}

export const getOfferings = (req, res) => handle(res, () => enrollmentService.listStudentOfferings(req.user.userId));

export const postEnrollment = (req, res) => handle(res, () => {
  const { offeringId } = req.body || {};
  if (!offeringId) {
    const err = new Error('請提供開課 ID (offeringId)');
    err.status = 400;
    throw err;
  }
  return enrollmentService.enrollCourse(req.user.userId, Number(offeringId));
});

export const deleteEnrollment = (req, res) => handle(res, () => {
  const offeringId = Number(req.params.offeringId);
  if (!offeringId) {
    const err = new Error('請提供開課 ID (offeringId)');
    err.status = 400;
    throw err;
  }
  return enrollmentService.dropCourse(req.user.userId, offeringId);
});

export const getSchedule = (req, res) => handle(res, () => enrollmentService.getStudentSchedule(req.user.userId));

export const getGrades = (req, res) => handle(res, () => enrollmentService.getStudentGrades(req.user.userId));