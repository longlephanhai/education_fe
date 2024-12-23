import { Button, Card, Table } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Theory = () => {
  const navigate = useNavigate()
  const colums = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content"
    },
    {
      title: "Hành động",
      dataIndex: "choose",
      key: "choose",
      render: (text, record) => (
        <Button type="primary" onClick={() => navigate(`${record.path}`)}>Chọn</Button>
      )
    }
  ]
  const dataSource = [
    {
      stt: 1,
      content: "Từ vựng",
      choose: "Chọn",
      path: "/practice/ly-thuyet/vocabulary"
    },
    {
      stt: 2,
      content: "Ngữ pháp",
      choose: "Chọn",
      path: "/practice/ly-thuyet/grammar"
    }
  ]
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
        <Table
          columns={colums}
          dataSource={dataSource}
          rowKey="stt"
       
        />
      </Card>
    </div>
  )
}

export default Theory
