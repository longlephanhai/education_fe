import { Button, Card, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Summary from '../../../API'

const PartTwo = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getPartTwo.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data.map(exam => ({
        ...exam,
        audioUrl: `${process.env.REACT_APP_URL_BACKEND}/${exam.audioUrl.replace(/\\/g, '/')}`
      })));
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'File nghe',
      dataIndex: 'audioUrl',
      key: 'audioUrl',
      render: (text, record) => (
        <div>
          <audio className="" controls>
            <source src={record.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`create-question/${record._id}`, { state: { title: record.name, id: record._id } })}>Cập nhật câu hỏi</Button>
          <Button type='default'onClick={()=>navigate(`detail/${record._id}`)}>Chi tiết câu hỏi</Button>
          <Button type='danger'>Xóa</Button>
        </>
      )
    }
  ]
  return (
    <Card title='Trang quản lý Part 2'>
      <Button type='primary' onClick={() => navigate('create-part2')}>Tạo mới câu hỏi</Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
      />
    </Card>
  )
}

export default PartTwo
