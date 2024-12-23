import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Card3 from '../../../asset/image/flashCard.webp'
import Card from '../../../asset/image/learning-progress-book-reading-horizon-600nw-2007235847.webp'
import Card2 from '../../../asset/image/educational-vector-illustration-undergoing-education-260nw-1743838400.webp'
import './Test.scss'
const Test = () => {
  return (
    <Row className="test-container">
      <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
        <Link to={'flashcard'} className="card">
          <img src={Card3} alt="" />
          <Link to={'flashcard'}>Ôn tập cơ bản</Link>
        </Link>
      </Col>
      <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
        <Link to={'define'} className="card">
          <img src={Card} alt="" />
          <Link to={'define'}>Nối các thẻ</Link>
        </Link>
      </Col>
      <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
        <Link to={'connect'} className="card">
          <img src={Card2} alt="" />
          <Link to={'connect'}>Chọn định nghĩa</Link>
        </Link>
      </Col>
    </Row>
  )
}

export default Test
