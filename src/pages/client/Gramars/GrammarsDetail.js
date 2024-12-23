/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Descriptions } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Summary from '../../../API'

const GrammarsDetail = () => {
  const [data, setData] = useState({})
  const params = useParams()
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.findGrammarBySlug.url + params.slug, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])


  const items = [
    {
      key: '1',
      label: 'Tiêu đề',
      children: <b>{data.title}</b>,
    },
    {
      key: '2',
      label: 'Nội dung',
      children: <div style={{ marginLeft: 20 }} dangerouslySetInnerHTML={{ __html: data.content }} />
    },
  ];
  return (
    <Card title="Trang chi tiết" style={{marginTop:'10vh', marginBottom:'20vh',minHeight:'90vh'}}>
      <Descriptions items={items} />
    </Card>
  )
}

export default GrammarsDetail
