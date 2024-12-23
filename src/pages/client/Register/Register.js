/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Form, Image, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Summary from '../../../API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { HiMiniUserCircle } from "react-icons/hi2";

const Register = () => {
  const navigate = useNavigate();
  const checkAccessToken = localStorage.getItem('access_token');
  
  useEffect(() => {
    if (checkAccessToken) {
      window.location.href = '/';
    }
  }, []);
  
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  const [avatar, setAvatar] = useState(null);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (values) => {
    if (values.password !== values['password-confirm']) {
      toast.error('Mật khẩu không trùng khớp!');
      return;
    }
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('email', values.email);
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('phone', values.phone);
    
    try {
      const response = await axios.post(Summary.signUp.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      setIsLoading(false);
      navigate(`/auth/code-id/${response.data.data._id}`);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Card title="Tạo tài khoản" bordered={false} style={{
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      minWidth: '100vh',
      width: '100%',
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
          status: "inactive"
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="avatar"
          wrapperCol={{
            offset: 12,
            span: 16,
          }}
        >
          {previewImage ? (
            <Image 
              src={previewImage} 
              alt="Avatar Preview" 
              className="product__image" 
              onClick={() => fileInputRef.current.click()} 
              style={{ width: 100, height: 100, cursor: 'pointer', borderRadius: '50%' }}
            />
          ) : (
            <HiMiniUserCircle 
              style={{ fontSize: "100px", cursor: 'pointer' }} 
              onClick={() => fileInputRef.current.click()} 
            />
          )}
          <input 
            style={{ display: "none" }} 
            ref={fileInputRef} 
            type="file" 
            name="avatar" 
            id="avatar" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đúng định dạng Email!',
              type: 'email',
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
              message: 'Vui lòng nhập password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="password-confirm"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
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
            Đăng ký tài khoản
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Register;
