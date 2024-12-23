/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Summary from '../../../API'
import { Button, Card, Table } from 'antd'

const TitleVocabulary = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getSlugs.url + params.slug, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const dataSource = data.map((item, index) => {
    return {
      title: item,
      key: item,
    }
  })


  const navigate = useNavigate()
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1
    },
    {
      title: "Chủ đề",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`${record.title}`)}>Chi tiết</Button>
        </>
      )
    }
  ]
  return (
    <Card title="Các chủ đề">
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
      />
    </Card>
  )
}

export default TitleVocabulary
