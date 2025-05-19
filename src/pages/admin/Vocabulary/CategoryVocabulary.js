/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import { useParams } from 'react-router-dom'
import { Button, Card, Table } from 'antd'
import useSpeechSynthesis from '../../../helper/useSpeechSynthesis'
import { MdOutlineKeyboardVoice } from "react-icons/md";
const CategoryVocabulary = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getCategory.url + params.slug + `/${params.title}`, {
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

  const { speak } = useSpeechSynthesis();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1
    },
    {
      title: "Từ vựng",
      dataIndex: "vocb",
      key: "vocb"
    },
    {
      title: "Nghe",
      dataIndex: "voice",
      key: "voice",
      render: (text, record) => (
        <Button onClick={() => speak({ text: record.vocb })}><MdOutlineKeyboardVoice /></Button>
      )
    },
    {
      title: "Nghĩa",
      dataIndex: "meaning",
      key: "meaning"
    },
    {
      title: "Phát âm",
      dataIndex: "pronounce",
      key: "pronounce"
    },
    {
      title: "Loại từ",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Hinh ảnh",
      dataIndex: "img",
      key: "img",
      render: (text, record) => (
        <img src={record.img} alt={record.vocb} style={{ width: '100px', height: '100px' }} />
      )
    },
    {
      title: "Ví dụ",
      dataIndex: "example",
      key: "example"
    },
    {
      title: "Nghe",
      dataIndex: "voice",
      key: "voice",
      render: (text, record) => (
        <Button onClick={() => speak({ text: record.example })}><MdOutlineKeyboardVoice /></Button>
      )
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type='primary'>Sửa</Button>
          <Button type='danger'>Xóa</Button>
        </>
      )
    }
  ]


  return (
    <Card title={`Danh sách từ vựng về ${params.title}`}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        scroll={{ y: 400 }}
      />
    </Card>
  )
}

export default CategoryVocabulary
