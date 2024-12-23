/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
import { toast } from 'react-toastify'
const CodeID = () => {
  const params = useParams()
  const id = params.id
  useEffect(() => {
    form.setFieldsValue({
      _id: id
    })
  }, [])

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isLoading, setIsLoadind] = useState(false)
  const onFinish = async (values) => {
    try {
      setIsLoadind(true)
      const response = await axios.post(Summary.checkCode.url, values)
      toast.success(response.data.message)
      setIsLoadind(false)
      navigate('/auth/login')
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoadind(false)
    }
  }


  return (
    <Card title="Trang nhập mã xác thực">
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
          name="_id"
          label="ID"
          style={{ display: 'none' }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="code"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã xác nhận!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} placeholder='Mã xác nhận' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading} >
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CodeID
