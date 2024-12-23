/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Form, Input, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Summary from '../../../API'
import { toast } from 'react-toastify'

const UpdateRole = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const token = localStorage.getItem('access_token')
  const id = useParams().id
  const navigate=useNavigate()
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getRolesById.url + `${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue({
        title: data.title,
        description: data.description
      })
    }
  }, [data, form])

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const response = await axios.patch(Summary.updateRole.url + `${id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.statusCode === 200) {
        toast.success(response.data.message)
        setIsLoading(false)
        navigate('/admin/role')
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false)
    }
  }
  return (
    <Card style={{ maxWidth: 800, margin: 'auto' }} title="Cập nhật nhóm quyền">
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          title: data.title,
          description: data.description
        }}
        onFinish={handleSubmit}
        autoComplete="off"

      >
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Tên nhóm quyền"
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Miêu tả ngắn"
              name="description"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col >
            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Cập nhật
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default UpdateRole
