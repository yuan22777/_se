import { Table, Button, Tag, Modal, Form, Input, InputNumber, Select, Space, Popconfirm, App as AntdApp } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const DAYS = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日'];

export default function CourseOfferingManagement() {
  const { message } = AntdApp.useApp();
  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [semesters, setSemesters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: d }, { data: u }, { data: c }, { data: s }] = await Promise.all([
        api.get('/admin/offerings'),
        api.get('/admin/users'),
        api.get('/admin/courses'),
        api.get('/admin/semesters'),
      ]);
      setData(d);
      setUsers(u.filter((x: any) => x.role === 'TEACHER'));
      setCourses(c);
      setSemesters(s);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeSemester = semesters.find((s) => s.is_active);

  const handleCreate = async () => {
    const values = await form.validateFields();
    try {
      await api.post('/admin/offerings', values);
      message.success('開課成功');
      setModalOpen(false);
      form.resetFields();
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '開課失敗');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/admin/offerings/${id}`);
      message.success('刪除成功');
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '刪除失敗（可能已有學生選課）');
    }
  };

  const columns = [
    { title: '開課代碼', dataIndex: 'course_code', key: 'code' },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '學分', dataIndex: 'credits', key: 'credits', width: 70 },
    { title: '授課教師', dataIndex: 'teacher_name', key: 'teacher' },
    {
      title: '時間',
      key: 'time',
      render: (_: any, r: any) => `${DAYS[r.day_of_week]} ${r.start_time}~${r.end_time}`,
    },
    { title: '教室', dataIndex: 'classroom', key: 'room' },
    {
      title: '選課人數',
      key: 'count',
      render: (_: any, r: any) => `${r.enrolled_count} / ${r.capacity}`,
    },
    {
      title: '學期',
      dataIndex: 'is_active',
      key: 'active',
      render: (v: boolean) => (v ? <Tag color="green">當前</Tag> : <Tag>歷史</Tag>),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, r: any) => (
        <Popconfirm title="確定刪除此開課？" onConfirm={() => handleDelete(r.id)}>
          <Button danger size="small">刪除</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增開課
        </Button>
      </Space>

      <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />

      <Modal
        title="新增開課"
        open={modalOpen}
        onOk={handleCreate}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ semesterId: activeSemester?.id, capacity: 40 }}
        >
          <Form.Item name="semesterId" label="學期" rules={[{ required: true }]}>
            <Select
              options={semesters.map((s) => ({
                value: s.id,
                label: `${s.academic_year}-${s.term}${s.is_active ? '（當前）' : ''}`,
              }))}
            />
          </Form.Item>
          <Form.Item name="courseId" label="課程" rules={[{ required: true }]}>
            <Select
              options={courses.map((c) => ({
                value: c.id,
                label: `${c.course_code} ${c.title}（${c.credits} 學分）`,
              }))}
            />
          </Form.Item>
          <Form.Item name="teacherId" label="授課教師" rules={[{ required: true }]}>
            <Select
              options={users.map((u) => ({ value: u.id, label: `${u.username} ${u.full_name}` }))}
            />
          </Form.Item>
          <Form.Item name="capacity" label="人數上限" rules={[{ required: true }]}>
            <InputNumber min={1} max={200} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="dayOfWeek" label="上課星期" rules={[{ required: true }]}>
            <Select options={DAYS.slice(1).map((d, i) => ({ value: i + 1, label: d }))} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 16 }}>
            <Form.Item name="startTime" label="開始時間" rules={[{ required: true }]}>
              <Input placeholder="09:00" />
            </Form.Item>
            <Form.Item name="endTime" label="結束時間" rules={[{ required: true }]}>
              <Input placeholder="10:30" />
            </Form.Item>
          </div>
          <Form.Item name="classroom" label="教室" rules={[{ required: true }]}>
            <Input placeholder="例：博愛樓 101" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}