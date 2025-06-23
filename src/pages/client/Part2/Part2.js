import { Button, Card, Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Summary from "../../../API"
const Part2 = () => {
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
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`${record._id}`, { state: { audioUrl: record.audioUrl } })}>Luyện tập</Button>
        </>
      )
    }
  ]
  return (
    <div style={{ height: '100vh' }}>
      <Card title='Đề thi' style={{ width: '100%', maxHeight: '90vh' }}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey='id'
          style={{ width: '100%', height: '100%' }}
        />
      </Card>
    </div>

  )
}

export default Part2
