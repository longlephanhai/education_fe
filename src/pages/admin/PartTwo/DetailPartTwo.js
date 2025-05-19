import axios from "axios"
import { useEffect, useState } from "react"
import Summary from "../../../API"
import { useParams } from "react-router-dom"
import { Card, Image, Table } from "antd"

const DetailPartTwo = () => {
  const params = useParams()
  const { id } = params
  const [data, setData] = useState([])
  const getQuestionPartOne = async () => {
    try {
      const response = await axios.get(Summary.detailPartTwo.url + `${id}`, {
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
    getQuestionPartOne()
  }, [])

  const columns = [
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
    <Card title='Trang quản lý câu hỏi Part 2'>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
      />
    </Card>
  )
}

export default DetailPartTwo
