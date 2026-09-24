import { Card, Table, Select, InputNumber, Button, Tag, Space, Popconfirm, App as AntdApp } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api/client';

const DAYS = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日'];

export default function GradeEntry() {
  const { message } = AntdApp.useApp();
  const [offerings, setOfferings] = useState<any[]>([]);
  const [selectedOffering, setSelectedOffering] = useState<number | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [scores, setScores] = useState<Record<number, number | null>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get('/teacher/offerings')
      .then(({ data }) => setOfferings(data.filter((o: any) => o.is_active)))
      .catch((e: any) => message.error(e.response?.data?.message || '載入授課清單失敗'));
  }, []);

  const loadStudents = async (offeringId: number) => {
    setSelectedOffering(offeringId);
    setLoading(true);
    try {
      const { data } = await api.get(`/teacher/offerings/${offeringId}/students`);
      setStudents(data);
      const map: Record<number, number | null> = {};
      data.forEach((s: any) => (map[s.student_id] = s.score));
      setScores(map);
    } catch (e: any) {
      message.error(e.response?.data?.message || '載入名冊失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const grades = Object.entries(scores)
      .filter(([, score]) => score !== null && score !== undefined)
      .map(([studentId, score]) => ({ studentId: Number(studentId), score }));
    try {
      await api.post(`/teacher/offerings/${selectedOffering}/scores`, { grades });
      message.success('成績已送出');
    } catch (e: any) {
      message.error(e.response?.data?.message || '送出失敗');
    }
  };

  const columns = [
    { title: '學號', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'full_name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: '平時/期中/期末成績 (0~100)',
      key: 'score',
      render: (_: any, r: any) => (
        <InputNumber
          min={0}
          max={100}
          value={scores[r.student_id] ?? undefined}
          onChange={(v) => setScores((prev) => ({ ...prev, [r.student_id]: v }))}
          placeholder={r.score !== null ? `已登錄 ${r.score}` : '未登錄'}
          style={{ width: 140 }}
          status={r.score === null ? 'warning' : undefined}
        />
      ),
    },
    {
      title: '狀態',
      key: 'status',
      render: (_: any, r: any) =>
        r.score !== null ? <Tag color="green">已登錄</Tag> : <Tag color="orange">尚未登錄</Tag>,
    },
  ];

  return (
    <Card title="成績登錄">
      <Space style={{ marginBottom: 16 }} wrap>
        <span>選擇課程：</span>
        <Select
          placeholder="請選擇授課課程"
          style={{ width: 320 }}
          value={selectedOffering ?? undefined}
          onChange={loadStudents}
          options={offerings.map((o) => ({
            value: o.offering_id,
            label: `${o.course_code} ${o.title}（${DAYS[o.day_of_week]} ${o.start_time}）`,
          }))}
        />
        {selectedOffering && (
          <Popconfirm title="確定送出全部成績？一鍵送出後可再修改。" onConfirm={handleSubmit}>
            <Button type="primary" disabled={students.length === 0}>
              一鍵送出
            </Button>
          </Popconfirm>
        )}
      </Space>

      <Table
        rowKey="student_id"
        columns={columns}
        dataSource={students}
        loading={loading}
        pagination={false}
      />
    </Card>
  );
}