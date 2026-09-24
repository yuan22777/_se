import { Card, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const DAYS = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日'];

export default function TeacherCourses() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/teacher/offerings')
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { title: '開課代碼', dataIndex: 'course_code', key: 'code' },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '學分', dataIndex: 'credits', key: 'credits' },
    {
      title: '上課時間',
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
      render: (v: boolean) => (v ? <Tag color="green">當前學期</Tag> : <Tag>歷史學期</Tag>),
    },
  ];

  return (
    <Card title="我的授課課程">
      <Table rowKey="offering_id" columns={columns} dataSource={data} loading={loading} />
    </Card>
  );
}