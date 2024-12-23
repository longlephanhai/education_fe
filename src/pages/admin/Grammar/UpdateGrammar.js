/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from '@tinymce/tinymce-react';
import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Summary from '../../../API';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateGrammar = () => {
  const [dataForm, setDataForm] = useState({})
  const params = useParams()
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.findGrammarBySlug.url + params.slug, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setDataForm(response.data.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title: dataForm.title,
      content: dataForm.content
    })
  }, [form, dataForm])

  const [data, setData] = useState({ content: "" })
  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      content: content || null
    }));
  };
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = async (values) => {
    values.content = data.content
    try {
      setIsLoading(true)
      const response = await axios.patch(Summary.updateGrammar.url + params.slug, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      toast.success(response.data.message)
      setIsLoading(false)
    } catch (error) {
      toast.error(error.response.data)
      setIsLoading(false)
    }
  }
  return (
    <Card title="Trang cập nhật từ vựng">
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

export default UpdateGrammar
