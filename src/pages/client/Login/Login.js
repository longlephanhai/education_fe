/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Flex, Form, Input } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Summary from '../../../API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ModalStep from '../../../components/client/Modal/ModalStep';
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from '@react-oauth/google';
const Login = () => {
  const navigate = useNavigate();
  const checkAccessToken = localStorage.getItem('access_token');
  useEffect(() => {
    if (checkAccessToken) {
      window.location.href = '/';
    }
  }, [])

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(Summary.signIn.url, values, { withCredentials: true });
      if (response.data.statusCode === 201) {
        console.log(response.data.data);
        localStorage.setItem('access_token', response.data.data.access_token);
        toast.success('Đăng nhập thành công!');
        setIsLoading(false);
        navigate('/');
        dispatch({ type: 'LOGIN', data: response.data.data });
      }
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      } else if (error.response.data.statusCode === 400) {
        toast.error(error.response.data.message);
        setEmail(values.email);
        setIsModalOpen(true);
        setIsLoading(false);
      }
    }
  };

  // login with google

  const handleGoogleLogin = async () => {
    const loginUrl = Summary.loginGoogle.url
    window.location.href = loginUrl;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('access_token', token);
      navigate('/');
      dispatch({ type: 'LOGIN' });
    }
  }, [])

  return (
    <>
      <Card title="Đăng nhập tại đây"
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
          form={form}
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            minWidth: '80vh',
            width: '100%',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
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
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>
              <a href="/auth/forgot-password">Quên mật khẩu</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" disabled={isLoading}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', }}>
            hoặc
            <div>
              <FcGoogle onClick={handleGoogleLogin} style={{
                fontSize: '40px',
                cursor: 'pointer',
                border: '1px solid #dddd',
                borderRadius: '50%',
                padding: '2px',
                backgroundColor: '#f0f0f0'
              }} />
            </div>
          </Form.Item>
          <Form.Item>
            Bạn chưa có tài khoản? <a href="/auth/register">Đăng ký ngay!</a>
          </Form.Item>
        </Form>
      </Card>
      <ModalStep isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} email={email} />
    </>

  )
}

export default Login
