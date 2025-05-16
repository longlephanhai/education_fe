import { Button, Card, Form, Input, message } from "antd"
import { useState } from "react";

const CreatePartFive = () => {
  const [audioFile, setAudioFile] = useState(null);
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      message.success(`${file.name} đã được chọn.`);
    }
  };

  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const onFinish = async (values) => { }

  return (
    <Card title="Trang tạo mới bộ đề">
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
          label="Tiêu đề bộ đề"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui long nhập tiêu đề bộ đề!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Miêu tả bộ đề"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập miêu tả bộ đề!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="File âm thanh bộ đề"
          name="audioUrl"
          rules={[{ required: true, message: 'Vui lòng gửi âm thanh bộ đề!' }]}
        >
          <input
            type="file"
            name="audioUrl"
            accept=".mp3,.wav,.ogg"
            onChange={handleAudioUpload}
          />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Tạo mới bộ đề
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreatePartFive
