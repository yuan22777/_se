import { Card, Descriptions, Table, Tag, Progress, Empty, App as AntdApp } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api/client';

function scoreColor(score: number) {
  if (score >= 90) return 'green';
  if (score >= 80) return 'blue';
  if (score >= 60) return 'cyan';
  return 'red';
}

function gpaColor(gpa: number) {
  if (gpa >= 3.5) return 'green';
  if (gpa >= 2.5) return 'blue';
  if (gpa >= 2.0) return 'cyan';
  return 'red';
}

export default function MyGrades() {
  const { message } = AntdApp.useApp();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/student/grades')
      .then(({ data }) => setData(data))
      .catch((e: any) => message.error(e.response?.data?.message || '載入失敗'))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: '學期',
      key: 'semester',
      render: (_: any, r: any) => `${r.academic_year}-${r.term}`,
    },
    { title: '課程代碼', dataIndex: 'course_code', key: 'code' },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '學分', dataIndex: 'credits', key: 'credits' },
    {
      title: '成績',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <Tag color={scoreColor(score)}>{score?.toFixed(2)}</Tag>,
    },
    {
      title: 'GPA 點數',
      dataIndex: 'gpaPoint',
      key: 'gpaPoint',
      render: (gpa: number) => <span>{gpa?.toFixed(1)}</span>,
    },
  ];

  if (!data && !loading) return <Empty description="尚無成績紀錄" />;

  return (
    <div>
      <Card title="總體 GPA" style={{ marginBottom: 24 }}>
        <Descriptions column={3}>
          <Descriptions.Item label="加權 GPA">
            <Tag color={gpaColor(data?.gpa ?? 0)} style={{ fontSize: 20 }}>
              {data?.gpa?.toFixed(2) ?? '—'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="總修讀學分">{data?.totalCredits ?? 0}</Descriptions.Item>
          <Descriptions.Item label="已登錄課程數">{data?.courses?.length ?? 0}</Descriptions.Item>
        </Descriptions>
        {data?.courses?.length > 0 && (
          <Progress
            percent={Math.round((data.gpa / 4) * 100)}
            status="active"
            strokeColor="#1890ff"
          />
        )}
      </Card>

      <Card title="歷年成績單">
        <Table rowKey="course_code" columns={columns} dataSource={data?.courses ?? []} loading={loading} />
      </Card>
    </div>
  );
}