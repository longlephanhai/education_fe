import { Button, Card, Table, Tour } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Practice = () => {
  const navigate = useNavigate()

  const colums = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content"
    },
    {
      title: "Hành động",
      dataIndex: "choose",
      key: "choose",
      render: (text, record, index) => (
        <Button
          ref={(el) => (buttonRefs.current[index] = el)}
          type="primary"
          onClick={() => navigate(`${record.path}`)}>Chọn</Button>
      )
    }
  ]
  const dataSource = [
    {
      stt: 1,
      content: "Lý thuyết",
      choose: "Chọn",
      path: "/practice/ly-thuyet"
    },
    {
      stt: 2,
      content: "Luyện thi toeic online",
      choose: "Chọn",
      path: "/practice/toeic"
    },
    {
      stt: 5,
      content: "Ôn tập part 1",
      choose: "Chọn",
      path: "/practice/part-one"
    },
    {
      stt: 6,
      content: "Ôn tập part 2",
      choose: "Chọn",
      path: "/practice/part-two"
    },
    {
      stt: 7,
      content: "Ôn tập part 3",
      choose: "Chọn",
      path: "/practice/part-three"
    },
    {
      stt: 8,
      content: "Ôn tập part 4",
      choose: "Chọn",
      path: "/practice/part-four"
    },
    {
      stt: 9,
      content: "Ôn tập part 5",
      choose: "Chọn",
      path: "/practice/part-five"
    },
    {
      stt: 10,
      content: "Ôn tập part 6",
      choose: "Chọn",
      path: "/practice/part-six"
    },
    {
      stt: 11,
      content: "Ôn tập part 7",
      choose: "Chọn",
      path: "/practice/part-seven"
    },
    {
      stt: 3,
      content: "Luyện viết với AI",
      choose: "Chọn",
      path: "/practice/learn-writing"
    },
    {
      stt: 4,
      content: "Luyện nói với AI",
      choose: "Chọn",
      path: "/practice/speaking"
    }
  ]


  const buttonRefs = useRef([]);

  const steps = dataSource.map((item, index) => ({
    title: item.content,
    description: `Đi đến ${item.content}`,
    target: () => buttonRefs.current[index],
  }));

  const [open, setOpen] = useState(false)
  const selector = useSelector((state) => state.tourReducer)
  useEffect(() => {
    setOpen(selector.tourOpen)
  }, [selector])
  // const handleStepChange = (current) => {
  //   if (current === 1) {
  //     navigate('ly-thuyet')
  //   }
  // }
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "100vh" }}>
      <Card style={{ width: '100%', maxHeight: '90vh', overflow: 'hidden', height: '100%' }}>
        <Table
          columns={colums}
          dataSource={dataSource}
          rowKey="stt"
        />
      </Card>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
      // onChange={handleStepChange}
      />
    </div>
  )
}

export default Practice
