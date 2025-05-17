import { Button, Card, Form, Image, Input, Select } from "antd"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Summary from "../../../API"
import { toast } from "react-toastify"

const CreateQuestionPartSeven = () => {
  const location = useLocation()
  const title = location?.state?.title
  const _id = location?.state?.id
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
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
  useEffect(() => {
    form.setFieldsValue({
      partSevenId: title,
    })
  })

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const onFinish = async (values) => {
    values.partSevenId = _id
    values.imageUrl = avatar
    setIsLoading(true)
    try {
      const response = await axios.post(Summary.postQuestionPartSeven.url, values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      toast.success(response.data.message)
      setIsLoading(false)
      form.resetFields()
      setPreviewImage(null)
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <Card title="Trang tạo câu hỏi">
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
          label="Tiêu đề"
          name="partSevenId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Thứ tự câu hỏi"
          name="questionNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thứ tự câu hỏi!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Hình ảnh"
        >
          <Input ref={fileInputRef} type="file" name="imageUrl" id="imageUrl" accept="image/*" onChange={handleImageChange} />
          <Image src={previewImage} alt='' className='product__image' />
        </Form.Item>

        <Form.Item
          label="Đáp án đúng"
          name="correctAnswer"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn đáp án đúng',
            },
          ]}
        >
          <Select>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
            <Select.Option value="C">C</Select.Option>
            <Select.Option value="D">D</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Tạo câu hỏi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateQuestionPartSeven
