import { Table, Button, Tag, Modal, Form, Input, Select, Space, Popconfirm, Upload, App as AntdApp } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const ROLE_TAG: Record<string, { color: string; label: string }> = {
  ADMIN: { color: 'red', label: '管理員' },
  TEACHER: { color: 'blue', label: '教師' },
  STUDENT: { color: 'green', label: '學生' },
};

export default function UserManagement() {
  const { message } = AntdApp.useApp();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/users');
      setData(data);
    } catch (e: any) {
      message.error(e.response?.data?.message || '載入失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    const values = await form.validateFields();
    try {
      await api.post('/admin/users', values);
      message.success('建立成功');
      setModalOpen(false);
      form.resetFields();
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '建立失敗');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/admin/users/${id}`);
      message.success('刪除成功');
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '刪除失敗');
    }
  };

  const handleBatchImport = async (rows: any[]) => {
    try {
      const { data } = await api.post('/admin/users/batch-import', { rows });
      message.success(`成功匯入 ${data.success} 筆${data.errors.length ? `，失敗 ${data.errors.length} 筆` : ''}`);
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '匯入失敗');
    }
  };

  const handleCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        message.error('CSV 內容不足');
        return;
      }
      const headers = lines[0].split(',').map((h) => h.trim());
      const rows = lines.slice(1).map((line) => {
        const cols = line.split(',').map((c) => c.trim());
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => (obj[h] = cols[i]));
        return {
          username: obj.username,
          email: obj.email,
          password: obj.password || 'pass123',
          fullName: obj.fullName,
          role: (obj.role || 'STUDENT').toUpperCase(),
        };
      });
      handleBatchImport(rows);
    };
    reader.readAsText(file, 'utf-8');
    return false;
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: '帳號', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={ROLE_TAG[role]?.color}>{ROLE_TAG[role]?.label}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm title="確定刪除此使用者？" onConfirm={() => handleDelete(record.id)}>
          <Button danger size="small">刪除</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增使用者
        </Button>
        <Upload beforeUpload={handleCSV} showUploadList={false} accept=".csv">
          <Button icon={<UploadOutlined />}>CSV 批次匯入</Button>
        </Upload>
      </Space>

      <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />

      <Modal
        title="新增使用者"
        open={modalOpen}
        onOk={handleCreate}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={{ role: 'STUDENT' }}>
          <Form.Item name="username" label="帳號" rules={[{ required: true, message: '請輸入帳號' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fullName" label="姓名" rules={[{ required: true, message: '請輸入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: '請輸入 Email' }, { type: 'email', message: 'Email 格式錯誤' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密碼" rules={[{ required: true, message: '請輸入密碼' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'STUDENT', label: '學生' },
                { value: 'TEACHER', label: '教師' },
                { value: 'ADMIN', label: '系統管理員' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}