/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Card, Checkbox, Flex, Form, Input } from 'antd';
import axios from 'axios';
import Summary from '../../../API';
import { toast, ToastContainer } from 'react-toastify';
const SignIn = () => {
  const checkAccessToken = localStorage.getItem('access_token');
  useEffect(() => {
    if (checkAccessToken) {
      window.location.href = '/admin';
    }
  }, [])
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(Summary.signIn.url, values, { withCredentials: true });
      if (response.data.statusCode === 201) {
        localStorage.setItem('access_token', response.data.data.access_token);
        toast.success('Đăng nhập thành công!');
        window.location.href = '/admin';
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      setIsLoading(false);
    }
  };
  return (
    <Card title="Đăng nhập trang quản trị">
      <ToastContainer autoClose={3000} />
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
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Không đúng định dạng e-maik!',
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
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>
            <a href="/admin/forgot-password">Quên mật khẩu?</a>
          </Flex>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading} >
            Đăng nhập
          </Button>
        </Form.Item>
{/* 
        <Form.Item
          style={{
            textAlign: 'center'
          }}
          wrapperCol={{
            offset: 2,
            span: 24,
          }}
        >
          Bạn chưa có tài khoản? <a href="/admin/register">Đăng ký tại đây.</a>
        </Form.Item> */}
      </Form>
    </Card>
  )
}

export default SignIn
