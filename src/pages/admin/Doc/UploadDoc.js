import axios from 'axios';
import React, { useState } from 'react'
import Summary from '../../../API';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
const UploadDoc = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const [loading, setLoading] = useState(false)
  const handleUpload = async (data) => {
    try {
      setLoading(true)
      data.file = file;
      const responseData = await axios.post(Summary.uploadDoc.url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      toast.success(responseData.data.message);
      form.resetFields();
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)
    }
  };

  const [form] = Form.useForm();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', backgroundColor: '#f9f9f9' }}>
      <div
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
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
            maxWidth: 400,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleUpload}
          autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề!',
              },
            ]}
          >
            <Input
              placeholder="Nhập tiêu đề"
              style={{ padding: '10px', borderRadius: '5px' }}
            />
          </Form.Item>

          <Form.Item
            label="Tài liệu"
            name="file"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tài liệu!',
              },
            ]}
          >
            <Input
              type="file"
              onChange={handleFileChange}
              style={{
                padding: '10px',
                borderRadius: '5px',
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}

export default UploadDoc
