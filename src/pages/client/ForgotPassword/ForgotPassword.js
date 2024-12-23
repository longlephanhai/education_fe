import { Button, Card, Form, Input } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import Summary from '../../../API'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      setIsLoading(true)
      const response = await axios.post(Summary.retryPassword.url, values)
      toast.success(response.data.message)
      setIsLoading(false)
      navigate('/auth/change-password', { state: { email: values.email } })
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  }
  return (
    <Card title="Trang gửi e-mail"
      style={{
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        flexDirection: 'column'
      }}>
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
          minWidth: '80vh',
          maxHeight: "100vh",
          alignSelf: 'center'
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Không đúng định dạng e-mail!',
            },
            {
              required: true,
              message: 'Vui lòng nhập e-mail!',
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
          <Button type="primary" htmlType="submit" loading={isLoading} >
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ForgotPassword
