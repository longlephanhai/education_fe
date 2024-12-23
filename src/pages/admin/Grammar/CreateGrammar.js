import React, { useState } from 'react'
import { Button, Card, Form, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import Summary from '../../../API';
import { toast } from 'react-toastify';
const CreateGrammar = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState("")
  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      content: content
    }));
  };

  const [isLoading, setIsLoading] = useState(false)
  const onFinish = async (values) => {
    values.content = data.content
    try {
      setIsLoading(true)
      const response = await axios.post(Summary.createGrammar.url, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
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
    <Card title="Trang tạo ngữ pháp">
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          style={{ width: `100%` }}
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nội dung',
            },
          ]}
        >
          <Editor
            apiKey='f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts'
            name="content" id="content"
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            onEditorChange={handleEditorChange}
          />
        </Form.Item>

        <Form.Item
          style={{ width: `100%` }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateGrammar
