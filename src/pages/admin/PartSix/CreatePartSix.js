import { Button, Card, Form, Input } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import Summary from '../../../API'
import { toast } from 'react-toastify'

const CreatePartSix = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    setIsLoading(true)
    try {
      const response = await axios.post(Summary.postPartSix.url, values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
      toast.success(response.data.message)
      setIsLoading(false)
      form.resetFields()
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  }
  return (
    <Card title="Trang tạo mới bộ đề">
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tiêu đề bộ đề"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui long nhập tiêu đề bộ đề!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Miêu tả bộ đề"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập miêu tả bộ đề!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Tạo mới bộ đề
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreatePartSix
