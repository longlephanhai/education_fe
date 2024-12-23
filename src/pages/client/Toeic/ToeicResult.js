import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Card, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ToeicResult = () => {
  const location = useLocation();
  const { score, correctAnswers, answers } = location.state;

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Đáp án đúng',
      dataIndex: 'correctAnswer',
      key: 'correctAnswer',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Đáp án của bạn',
      dataIndex: 'userAnswer',
      key: 'userAnswer',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Text
          style={{
            color: result === 'Dung' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {result === 'Dung' ? (
            <CheckCircleOutlined style={{ color: 'green' }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red' }} />
          )}
          {result === 'Dung' ? 'Đúng' : 'Sai'}
        </Text>
      ),
    },
  ];

  const data = correctAnswers.slice(1).map((item, index) => ({
    key: index + 1,
    question: index + 1, 
    correctAnswer: item,
    userAnswer: answers[index + 1], 
    result: item === answers[index + 1] ? 'Dung' : 'Sai',
  }));

  return (
    <div style={{ marginTop: '10vh', padding: '0 20px' }}>
      <Card
        title={<Title level={2}>Kết quả bài thi TOEIC</Title>}
        extra={<Text strong>Điểm: {score}</Text>}
        bordered={false}
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          rowKey="key"
          style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
        />
      </Card>
    </div>
  );
};

export default ToeicResult;
