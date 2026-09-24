import { Layout, Menu, Button, Dropdown, Typography, Modal, Form, Input, App as AntdApp } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '../api/client';

const { Header, Content } = Layout;
const { Title } = Typography;

const ROLE_LABEL: Record<string, string> = {
  ADMIN: '系統管理員',
  TEACHER: '教師',
  STUDENT: '學生',
};

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [pwOpen, setPwOpen] = useState(false);
  const [pwForm] = Form.useForm();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleResetPassword = async () => {
    const values = await pwForm.validateFields();
    try {
      await api.post('/auth/reset-password', {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      message.success('密碼重設成功');
      setPwOpen(false);
      pwForm.resetFields();
    } catch (e: any) {
      message.error(e.response?.data?.message || '密碼重設失敗');
    }
  };

  const menuItems =
    user?.role === 'ADMIN'
      ? [
          { key: '/admin/dashboard', label: '儀表板' },
          { key: '/admin/users', label: '使用者管理' },
          { key: '/admin/semesters', label: '學期管理' },
          { key: '/admin/offerings', label: '開課管理' },
        ]
      : user?.role === 'TEACHER'
        ? [
            { key: '/teacher/courses', label: '我的課程' },
            { key: '/teacher/grades', label: '成績登錄' },
          ]
        : [
            { key: '/student/select', label: '線上選課' },
            { key: '/student/schedule', label: '我的課表' },
            { key: '/student/grades', label: '成績查詢' },
          ];

  const userMenu = {
    icon: <DownOutlined />,
    items: [
      {
        key: 'reset-password',
        label: '重設密碼',
        onClick: () => setPwOpen(true),
      },
      {
        key: 'logout',
        label: '登出',
        onClick: () => {
          logout();
          navigate('/login');
        },
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#001529',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            校務行政系統
          </Title>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        {user && (
          <Dropdown menu={userMenu}>
            <Button type="text" style={{ color: '#fff' }}>
              {user.fullName}（{ROLE_LABEL[user.role] ?? user.role}）<DownOutlined />
            </Button>
          </Dropdown>
        )}
      </Header>
      <Content style={{ padding: 24 }}>
        <Outlet />
      </Content>
      <Modal
        title="重設密碼"
        open={pwOpen}
        onOk={handleResetPassword}
        onCancel={() => setPwOpen(false)}
        destroyOnClose
      >
        <Form form={pwForm} layout="vertical">
          <Form.Item
            name="oldPassword"
            label="目前密碼"
            rules={[{ required: true, message: '請輸入目前密碼' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密碼（至少 6 碼）"
            rules={[
              { required: true, message: '請輸入新密碼' },
              { min: 6, message: '新密碼長度至少 6 碼' },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}