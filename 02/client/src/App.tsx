import { Routes, Route, Navigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import SemesterManagement from './pages/admin/SemesterManagement';
import CourseOfferingManagement from './pages/admin/CourseOfferingManagement';
import CourseSelection from './pages/student/CourseSelection';
import MySchedule from './pages/student/MySchedule';
import MyGrades from './pages/student/MyGrades';
import TeacherCourses from './pages/teacher/TeacherCourses';
import GradeEntry from './pages/teacher/GradeEntry';

const ROLE_HOME: Record<string, string> = {
  ADMIN: '/admin/dashboard',
  TEACHER: '/teacher/courses',
  STUDENT: '/student/select',
};

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[user.role] ?? '/login'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <AntdApp>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomeRedirect />} />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/semesters"
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <SemesterManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/offerings"
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <CourseOfferingManagement />
              </ProtectedRoute>
            }
          />

          {/* Student */}
          <Route
            path="/student/select"
            element={
              <ProtectedRoute roles={['STUDENT']}>
                <CourseSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/schedule"
            element={
              <ProtectedRoute roles={['STUDENT']}>
                <MySchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/grades"
            element={
              <ProtectedRoute roles={['STUDENT']}>
                <MyGrades />
              </ProtectedRoute>
            }
          />

          {/* Teacher */}
          <Route
            path="/teacher/courses"
            element={
              <ProtectedRoute roles={['TEACHER']}>
                <TeacherCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/grades"
            element={
              <ProtectedRoute roles={['TEACHER']}>
                <GradeEntry />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AntdApp>
    </AuthProvider>
  );
}