import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const UnAuthor = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập trang này"
      extra={<Button type="primary" onClick={() => navigate('/')}>Trở về</Button>}
    />
  )
}

export default UnAuthor
