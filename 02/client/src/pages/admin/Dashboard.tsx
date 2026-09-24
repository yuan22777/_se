import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { UserOutlined, BookOutlined, ReadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [offerings, setOfferings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/admin/users'), api.get('/admin/offerings')])
      .then(([u, o]) => {
        setUsers(u.data);
        setOfferings(o.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const teachers = users.filter((u) => u.role === 'TEACHER');
  const students = users.filter((u) => u.role === 'STUDENT');
  const activeOfferingCount = offerings.filter((o) => o.is_active).length;

  const recentColumns = [
    { title: '開課代碼', dataIndex: 'course_code', key: 'code' },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '授課教師', dataIndex: 'teacher_name', key: 'teacher' },
    { title: '選課人數', dataIndex: 'enrolled_count', key: 'count' },
    {
      title: '學期',
      dataIndex: 'is_active',
      key: 'semester',
      render: (v: boolean) => (v ? <Tag color="green">當前學期</Tag> : <Tag>歷史學期</Tag>),
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="學生人數" value={students.length} prefix={<ReadOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="教師人數" value={teachers.length} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="當前學期開課數" value={activeOfferingCount} prefix={<BookOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="當前學期開課概況" style={{ marginTop: 24 }} loading={loading}>
        <Table
          rowKey="id"
          columns={recentColumns}
          dataSource={offerings.filter((o) => o.is_active)}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
}