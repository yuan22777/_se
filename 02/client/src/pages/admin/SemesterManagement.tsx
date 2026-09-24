import { Table, Button, Tag, Modal, Form, InputNumber, Space, App as AntdApp } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function SemesterManagement() {
  const { message } = AntdApp.useApp();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/semesters');
      setData(data);
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
      await api.post('/admin/semesters', values);
      message.success('新增學期成功');
      setModalOpen(false);
      form.resetFields();
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '新增失敗');
    }
  };

  const handleActivate = async (id: number) => {
    try {
      await api.patch(`/admin/semesters/${id}/activate`);
      message.success('已切換為當前學期');
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '切換失敗');
    }
  };

  const columns = [
    {
      title: '學期',
      key: 'label',
      render: (_: any, r: any) => `${r.academic_year}-${r.term}${r.term === 1 ? ' (上)' : ' (下)'}`,
    },
    { title: '學年度', dataIndex: 'academic_year', key: 'year' },
    { title: '學期', dataIndex: 'term', key: 'term', render: (t: number) => (t === 1 ? '上學期' : '下學期') },
    {
      title: '狀態',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (v: boolean) => (v ? <Tag color="green">當前開放學期</Tag> : <Tag>未開放</Tag>),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, r: any) =>
        r.is_active ? (
          <span>—</span>
        ) : (
          <Button size="small" onClick={() => handleActivate(r.id)}>
            設為當前學期
          </Button>
        ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增學期
        </Button>
      </Space>

      <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />

      <Modal
        title="新增學期"
        open={modalOpen}
        onOk={handleCreate}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={{ term: 1 }}>
          <Form.Item name="academicYear" label="學年度（例 114）" rules={[{ required: true, message: '請輸入學年度' }]}>
            <InputNumber min={100} max={999} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="term" label="學期" rules={[{ required: true }]}>
            <InputNumber min={1} max={2} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}