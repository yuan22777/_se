import { Table, Button, Tag, Space, App as AntdApp } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const DAYS = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日'];

export default function CourseSelection() {
  const { message } = AntdApp.useApp();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [acting, setActing] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/student/offerings');
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

  const handleEnroll = async (offeringId: number) => {
    setActing(offeringId);
    try {
      await api.post('/student/enrollments', { offeringId });
      message.success('加選成功！');
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '加選失敗');
    } finally {
      setActing(null);
    }
  };

  const handleDrop = async (offeringId: number) => {
    setActing(offeringId);
    try {
      await api.delete(`/student/enrollments/${offeringId}`);
      message.success('退選成功！');
      fetchData();
    } catch (e: any) {
      message.error(e.response?.data?.message || '退選失敗');
    } finally {
      setActing(null);
    }
  };

  const columns = [
    { title: '課程代碼', dataIndex: 'course_code', key: 'code', width: 110 },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '學分', dataIndex: 'credits', key: 'credits', width: 70 },
    { title: '授課教師', dataIndex: 'teacher_name', key: 'teacher' },
    {
      title: '上課時間',
      key: 'time',
      render: (_: any, r: any) => `${DAYS[r.day_of_week]} ${r.start_time}~${r.end_time}`,
    },
    { title: '教室', dataIndex: 'classroom', key: 'room' },
    {
      title: '剩餘名額',
      key: 'seats',
      render: (_: any, r: any) => (
        <span>
          {r.seats_left > 0 ? (
            <Tag color={r.seats_left <= 5 ? 'orange' : 'green'}>{r.seats_left} 名額</Tag>
          ) : (
            <Tag color="red">已額滿</Tag>
          )}
        </span>
      ),
    },
    {
      title: '狀態',
      key: 'status',
      render: (_: any, r: any) =>
        r.alreadyEnrolled ? <Tag color="blue">已選修</Tag> : <Tag>未選修</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, r: any) =>
        r.alreadyEnrolled ? (
          <Button size="small" type="text" danger loading={acting === r.offering_id} onClick={() => handleDrop(r.offering_id)}>
            退選
          </Button>
        ) : (
          <Button
            size="small"
            type="primary"
            disabled={r.seats_left <= 0}
            loading={acting === r.offering_id}
            onClick={() => handleEnroll(r.offering_id)}
          >
            加選
          </Button>
        ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>當前學期開放選課，採名額先搶先贏制。</span>
      </Space>
      <Table rowKey="offering_id" columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}