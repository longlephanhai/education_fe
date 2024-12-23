import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Card, Col, Descriptions, Form, Input, Row } from 'antd';
import axios from 'axios';
import Summary from '../../../API';
import { toast } from 'react-toastify';
const LearnWriting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const [form] = Form.useForm();
  const [prompt, setPrompt] = useState('');
  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      if (editorRef.current) {
        const plainText = editorRef.current.getContent({ format: 'text' });
        const response = await axios.post(Summary.gemini.url, {
          prompt: plainText,
          title: title
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        setPrompt(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // tao đề ngẫu nhiên
  const [title, setTitle] = useState('');
  const handleRandom = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(Summary.randomTopic.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const { title, hints } = response.data.data;
      setTitle(title);
      form.setFieldsValue({ randomTopic: `${title} \n (Gợi ý: ${hints})` });
      toast.success('Đề ngẫu nhiên đã được tạo!');
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi tạo đề ngẫu nhiên.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card style={{ margin: '10vh auto', minHeight: '80vh', minWidth: '100%', flexDirection: 'column' }}>
      <Form form={form} onFinish={handleSubmit} style={{ minWidth: '70vh', width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="randomTopic">
              <Input placeholder="Chủ đề ngẫu nhiên sẽ hiển thị tại đây" />
            </Form.Item>
            <Button type="primary" onClick={handleRandom} loading={isLoading}>
              Tạo đề ngẫu nhiên
            </Button>
          </Col>
        </Row>
        <Form.Item name="prompt">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts"
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Nộp
          </Button>
        </Form.Item>
      </Form>
      <Input.TextArea value={prompt} readOnly rows={16} />
    </Card>
  )
}

export default LearnWriting
