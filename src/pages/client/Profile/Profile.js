import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Summary from '../../../API';
import { Button, Card, Col, Form, Image, Input, Row } from 'antd';
import { toast } from 'react-toastify';

const Profile = () => {
  const [data, setData] = useState({})
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getProfile.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.data.statusCode === 200) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  console.log(data);



  const [form] = Form.useForm()
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        avatar: data.avatar,
      })
      setPreviewImage(data.avatar)
    }
  }, [data, form])
  const fileInputRef = useRef(null);
  const handleOnClick = () => {
    fileInputRef.current.click()
  }
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file)
    }
  };

  //cập nhật thông tin
  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('phone', values.phone)
      formData.append('avatar', avatar)
      const response = await axios.patch(Summary.updateAccount.url + data._id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      })
      console.log(response.data);
      if (response.data.statusCode === 200) {
        setIsLoading(false)
        fetchApi()
        toast.success('Cập nhật thông tin thành công!')
      }
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <Card title="Cập nhật tài khoản" bordered={false}
      style={{ marginTop: 8, textAlign: 'center', minHeight: '100vh' }}>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
        initialValues={{
          status: 'inactive',
        }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="avatar"
              // label="Avatar"
              labelAlign="left"
              style={{ textAlign: 'center' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Hình ảnh avatar */}
                {previewImage && (
                  <Image
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '8px' }}
                    src={previewImage}
                    alt=""
                    className="product__image"
                  />
                )}
                {/* Label Avatar */}
                <label htmlFor="avatar" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Avatar
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />

                <Button onClick={handleOnClick}>Chọn ảnh</Button>
              </div>
            </Form.Item>
          </Col>
        </Row>


        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ và tên" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Số điện thoại" name="phone">
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Cập nhật thông tin
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>

  )
}

export default Profile
