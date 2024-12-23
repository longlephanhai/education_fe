import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Button, Form } from 'antd';
import axios from 'axios';
import Summary from '../../../API';
import { toast } from 'react-toastify'
const AboutUs = () => {
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const handleSubmit = async (data) => {
    try {
      const content = editorRef.current.getContent();
      const response = await axios.post(Summary.aboutUs.url, { content }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.data.statusCode === 201) {
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  // lấy data
  const [data,setData]=useState({})
  const fetchApi=async()=>{
    try {
      const response=await axios.get(Summary.getAboutUs.url,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if(response.data.statusCode===200){
        setData(response.data.data.content)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchApi()
  },[])
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="content"
          label="Nội dung"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{ width: '100%' }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Editor
            initialValue={data}
            onInit={(evt, editor) => editorRef.current = editor}
            apiKey="f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts"
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AboutUs
