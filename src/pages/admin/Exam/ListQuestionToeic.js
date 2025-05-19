import { useEffect, useState } from "react"
import axios from 'axios'
import Summary from "../../../API"
import { useParams } from "react-router-dom"
import { Button, Card, Image, Table } from "antd"
const ListQuestionToeic = () => {
  const params = useParams()
  const { id } = params
  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get(Summary.getQuestionToeic.url + `${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])


  const columns = [
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Câu hỏi",
      dataIndex: "questionNumber",
      key: "questionNumber",
    },
    {
      title: "Đáp án",
      dataIndex: "correctAnswer",
      key: "correctAnswer",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text, record) => (
        <Image src={record.imageUrl} alt="question" style={{ width: '50px', height: '50px' }} />
      )
    }
  ]

  return (
    <Card title='Trang quản lý câu hỏi'>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
      />
    </Card>
  )
}

export default ListQuestionToeic
