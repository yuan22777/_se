import { Card, Descriptions, Table, Tag, Empty, App as AntdApp } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const DAYS = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日'];

export default function MySchedule() {
  const { message } = AntdApp.useApp();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/student/schedule')
      .then(({ data }) => setData(data))
      .catch((e: any) => message.error(e.response?.data?.message || '載入失敗'))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: '星期',
      dataIndex: 'day_of_week',
      key: 'day',
      render: (d: number) => <Tag color="blue">{DAYS[d]}</Tag>,
    },
    {
      title: '時間',
      key: 'time',
      render: (_: any, r: any) => `${r.start_time} ~ ${r.end_time}`,
    },
    { title: '課程代碼', dataIndex: 'course_code', key: 'code' },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '教室', dataIndex: 'classroom', key: 'room' },
    { title: '授課教師', dataIndex: 'teacher_name', key: 'teacher' },
  ];

  return (
    <div>
      {data.length === 0 && !loading ? (
        <Empty description="本學期尚未選修任何課程" />
      ) : (
        <Card title="當學期個人週課表">
          <Table rowKey="offering_id" columns={columns} dataSource={data} loading={loading} />
        </Card>
      )}
    </div>
  );
}