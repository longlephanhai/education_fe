/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './Vocabulary.scss'
import { Button, Card, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
import { useSelector } from 'react-redux'
const Vocabulary = () => {
  const navigate = useNavigate()
  const permissions = useSelector(state => state.role)
  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  // Kiểm tra quyền truy cập sau khi `permissions` được cập nhật
  useEffect(() => {
    if (permissionsArray.length > 0) {
      if (!permissionsArray?.includes('vocab_view')) {
        navigate('/unauthorized');
      }
    }
  }, [permissionsArray, navigate]);
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
          <Button type="primary" onClick={() => navigate(record.slug)}>Chi tiết</Button>
        </>
      )
    }
  ]


  return (
    <Card title="Trang quản lý từ vựng">
      <Button type='primary' onClick={() => navigate('create-vocabulary')}>Cập nhật từ vựng</Button>
      <Table
        columns={columns}
        dataSource={titles}
        rowKey="key"
      />
    </Card>
  )
}

export default Vocabulary
