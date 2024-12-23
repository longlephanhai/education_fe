import { AutoComplete, Button, Card, Form, Image, Input, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Summary from '../../../API';
import { toast } from 'react-toastify';
const CreateVocabulary = () => {
  // get title
  const [titles, setTitles] = useState([])
  const [categorys, setCategorys] = useState([])
  const fetchTitles = async () => {
    try {
      const response = await axios.get(Summary.getTitles.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setTitles(response.data.data.titles)
      setCategorys(response.data.data.category)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchTitles()
  }, [])

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

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('vocb', values.vocb);
    formData.append('meaning', values.meaning);
    formData.append('pronounce', values.pronounce);
    formData.append('type', values.type);
    formData.append('example', values.example);
    formData.append('category', values.category);
    formData.append('level', values.level);
    formData.append('img', avatar);
    try {
      const response = await axios.post(Summary.createVocabulary.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      toast.success(response.data.message)
      form.resetFields()
      setPreviewImage(null)
      setIsLoading(false)
      fetchTitles()
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }

  }
  return (
    <Card title="Tạo từ vựng" bordered={false} style={{ marginTop: 8 }}>
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
          label="Tiêu đề từ vựng"
          name="title"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề!',
            },
          ]}
        >
          <AutoComplete
            placeholder="Nhập hoặc chọn tiêu đề"
            options={titles.map((title, index) => ({
              value: title._id,
              label: title._id,
            }))}
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Chủ đề"
          name="category"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập chủ đề từ vựng!',
            },
          ]}
        >
          <AutoComplete
            placeholder="Nhập hoặc chọn chủ đề"
            options={categorys.map((category, index) => ({
              value: category,
              label: category,
            }))}
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Từ vựng"
          name="vocb"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập từ vựng!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nghĩa"
          name="meaning"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nghĩa của từ!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phát âm"
          name="pronounce"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập phát âm!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại từ"
          name="type"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập loại từ!',
            },
          ]}
        >
          <Select placeholder="-- Chọn --">
            <Select.Option value="noun">Danh từ (Noun)-n</Select.Option>
            <Select.Option value="verb">Động từ (Verb)-v</Select.Option>
            <Select.Option value="adjective">Tính từ (Adjective)-adj</Select.Option>
            <Select.Option value="adverb">Trạng từ (Adverb)-adv</Select.Option>
            <Select.Option value="preposition">Giới từ (Preposition)-prep</Select.Option>
            <Select.Option value="conjunction">Liên từ (Conjunction)-conj</Select.Option>
            <Select.Option value="interjection">Thán từ (Interjection)-int</Select.Option>
            <Select.Option value="pronoun">Đại từ (Pronoun)-pron</Select.Option>
            <Select.Option value="numeral">Số từ (Numeral)-num</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Ví dụ"
          name="example"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập ví dụ!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Cấp độ"
          name="level"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập cấp độ từ vựng!',
            },
          ]}
        >
          <Select placeholder="-- Chọn --">
            <Select.Option value="easy">Dễ</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="hard">Khó</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="img"
          label="Hình ảnh"
        >
          <Input ref={fileInputRef} type="file" name="img" id="img" accept="image/*" onChange={handleImageChange} />
          <Image src={previewImage} width={100} height={"auto"} alt='' className='product__image' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Tạo từ vựng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateVocabulary
