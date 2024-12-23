/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card } from 'antd';
import { IoCodeSlashOutline } from "react-icons/io5";
import { CiUnlock } from "react-icons/ci";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import axios from 'axios';
import Summary from '../../../API';
import { toast } from 'react-toastify';
const ChangePassword = () => {
  const location = useLocation();
  const { email } = location.state
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      email: email
    })
  }, [])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      setIsLoading(true)
      const response = await axios.post(Summary.changePassword.url, values)
      toast.success(response.data.message)
      setIsLoading(false)
      navigate('/auth/login')
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  };

  return (
    <Card title="Gửi mã xác nhận">
      <Form
        name="login"
        form={form}
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
        >
          <Input prefix={<MdOutlineMarkEmailRead />} disabled />
        </Form.Item>

        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã xác nhận!',
            },
          ]}
        >
          <Input prefix={<IoCodeSlashOutline />} placeholder="Mã xác nhận" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập xác nhận mật khẩu!',
            },
          ]}
        >
          <Input prefix={<CiUnlock />} type="password" placeholder="Xác nhận mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" disabled={isLoading}>
            Gửi mã
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ChangePassword
