import { Card, Form, Input, Button, Typography, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';

const ROLE_HOME: Record<string, string> = {
  ADMIN: '/admin/dashboard',
  TEACHER: '/teacher/courses',
  STUDENT: '/student/select',
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', values);
      login(data.user, data.token);
      navigate(ROLE_HOME[data.user.role] ?? '/');
    } catch (e: any) {
      setError(e.response?.data?.message || '登入失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #001529 0%, #1890ff 100%)',
      }}
    >
      <Card style={{ width: 380, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 8 }}>
          校務行政系統
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', color: '#888' }}>
          請登入以繼續
        </Typography.Paragraph>
        {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
        <Form name="login" onFinish={onFinish} size="large">
          <Form.Item name="username" rules={[{ required: true, message: '請輸入帳號' }]}>
            <Input prefix={<UserOutlined />} placeholder="帳號" autoComplete="username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '請輸入密碼' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密碼" autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登入
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          測試帳號：admin/admin123、T001/pass123、S001~S005/pass123
        </Typography.Text>
      </Card>
    </div>
  );
}