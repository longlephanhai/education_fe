import { Button, Card, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import Summary from '../../../API'
import { toast } from 'react-toastify';
const CreateRole = () => {
  const [form] = Form.useForm()
  const token = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values) => {

    try {
      const response = await axios.post(Summary.createRole.url, values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.statusCode === 201) {
        form.resetFields()
        toast.success("Tạo nhóm quyền thành công")
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <Card style={{ maxWidth: 800, margin: 'auto' }} title="Trang tạo nhóm quyền">
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
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Tên nhóm quyền"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên nhóm quyền!',
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập miêu tả ngắn!',
                },
              ]}
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
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default CreateRole
