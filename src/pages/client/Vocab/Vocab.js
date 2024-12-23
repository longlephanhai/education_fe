import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
const Vocab = () => {
  const navigate = useNavigate()
  const [titles, setTitles] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getTitles.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setTitles(response.data.data.titles)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1
    },
    {
      title: "Tiêu đề",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => navigate(record.slug)}>Ôn tập</Button>
        </>
      )
    }
  ]
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
        <Table
          columns={columns}
          dataSource={titles}
          rowKey="key"
        />
      </Card>
    </div>
  )
}

export default Vocab
