import { Button, Card, Table } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Summary from "../../../API"
import { useEffect, useState } from "react"
const PartSeven = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getPartSeven.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data);
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
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`create-question/${record._id}`, { state: { title: record.name, id: record._id } })}>Cập nhật câu hỏi</Button>
          <Button type='default'>Chi tiết câu hỏi</Button>
          <Button type='danger'>Xóa</Button>
        </>
      )
    }
  ]
  return (
    <Card title='Trang quản lý Part 7'>
      <Button type='primary' onClick={() => navigate('create-part7')}>Tạo mới câu hỏi</Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
      />
    </Card>
  )
}

export default PartSeven
