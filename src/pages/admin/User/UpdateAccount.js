/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Form, Image, Input, Radio, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Summary from '../../../API'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateAccount = () => {
  // Get roles
  const [roles, setRoles] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getRoles.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setRoles(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  // get data by id
  const params = useParams()
  const [data, setData] = useState({})
  const fetchApiById = async () => {
    try {
      const response = await axios.get(Summary.getAccounts.url + params.id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApiById()
  }, [])


  const [form] = Form.useForm()
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role._id,
        status: data.isActive ? "active" : "inactive",
        avatar: data.avatar,
      })
      setPreviewImage(data.avatar)
    }

  }, [data, form])

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
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


  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('email', values.email);
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('phone', values.phone);
    formData.append('role', values.role);
    formData.append('status', values.status);
    try {
      const response = await axios.patch(Summary.updateAccount.url + params.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message)
        setIsLoading(false)
        navigate('/admin/user')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  }
  return (
    <Card title="Cập nhật tài khoản" bordered={false} style={{ marginTop: 8 }}>
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
          maxWidth: 500,
          maxHeight: "100vh"
        }}
        initialValues={{
          status: "inactive"
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
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
          label="Password"
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
          label="Số điện thoại"
          name="phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar"
        >
          <Input ref={fileInputRef} type="file" name="avatar" id="avatar" accept="image/*" onChange={handleImageChange} />
          <Image src={previewImage} alt='' className='product__image' />
        </Form.Item>
        <Form.Item
          name="role"
          label="Phân quyền"
          hasFeedback
        >
          <Select placeholder="-- Chọn --">
            {
              roles?.map((role, index) => (
                <Select.Option key={index} value={role._id}>{role.title}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Trạng thái">
          <Radio.Group >
            <Radio value="active" >Hoạt động</Radio>
            <Radio value="inactive">Không hoạt động</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          name="submit"
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default UpdateAccount
