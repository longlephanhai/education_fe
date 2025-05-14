/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Summary from '../../../API'
import { Card, Radio, Button, Col, Row } from 'antd';
import { IoIosFlag } from "react-icons/io";
const ToeicTest = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const audioUrl = useState(location.state.audioUrl)
  audioUrl[0] = `${audioUrl[0].replace(/\\/g, '/')}`

  const params = useParams()
  const [data, setData] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState([])

  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getExamById.url + params.id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data);
      const correctAnswers = response.data.data.map(item => item.correctAnswer)
      setCorrectAnswers(correctAnswers)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const [choosenAnswers, setChoosenAnswers] = useState([])
  const onChange = (questionNumber, value) => {
    questionNumber = parseInt(questionNumber)
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionNumber]: value
    }))
    if (!choosenAnswers.includes(questionNumber)) {
      setChoosenAnswers([...choosenAnswers, questionNumber])
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  const handlePreQuestion = () => {
    if (currentQuestionIndex <= data.length - 1 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  let array = []
  for (let i = 1; i <= 200; i++) {
    array.push(i)
  }

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [total, setTotal] = useState(0);
  const handleSubmit = () => {
    let score = 0;
    correctAnswers.forEach((item, index) => {
      if (answers[index] === item) {
        score += 5;
      }
    })
    setTotal(score);
    navigate(`/practice/toeic/result/${params.id}`, { state: { score, correctAnswers, answers } })
  }

  const [flag, setFlag] = useState([])
  const handleFlag = (questionNumber) => {
    if (!flag.includes(questionNumber)) {
      setFlag([...flag, questionNumber])
    } else {
      setFlag(flag.filter(item => item !== questionNumber))
    }
  }

  return (
    <Card style={{ minHeight: '100vh', marginTop: '10vh', padding: '2rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
      {/* Phần audio */}
      <Row justify="center" style={{ marginBottom: '2rem' }}>
        <audio controls>
          <source src={audioUrl[0]} type="audio/mpeg" />
        </audio>
      </Row>

      <Row>
        <Button type='primary' onClick={handleSubmit}>
          Nộp bài
        </Button>
      </Row>

      {/* Phần câu hỏi */}
      <Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {data.length > 0 && (
          <Col xxl={24} xl={24} xs={24} md={18} lg={12} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', minWidth: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Câu hỏi {data[currentQuestionIndex].questionNumber}
            </div>

            {/* Hình ảnh câu hỏi */}
            <img
              src={data[currentQuestionIndex].imageUrl}
              alt=""
              style={{ width: '60%', height: 'auto', marginTop: '-1rem' }}
            />

            {/* Nhóm các lựa chọn */}
            <Radio.Group
              disabled={data[currentQuestionIndex].questionNumber === "0"}
              name={`${data[currentQuestionIndex].questionNumber}`}
              value={answers[data[currentQuestionIndex].questionNumber]}
              onChange={(e) => onChange(data[currentQuestionIndex].questionNumber, e.target.value)}
            >
              <Row gutter={[10, 10]}>
                {['A', 'B', 'C', 'D'].map((option) => (
                  <Col key={option}>
                    <Radio value={option}>{option}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>

            {/* Nút điều hướng */}
            <Row gutter={[16,16]} style={{ marginTop: '1rem',gap:'1rem' }}>
              <Button onClick={handlePreQuestion} >
                Câu trước
              </Button>
              <Button onClick={handleNextQuestion} >
                Câu kế
              </Button>
              <Button icon={<IoIosFlag/>} disabled={data[currentQuestionIndex].questionNumber === "0"} onClick={() => handleFlag(currentQuestionIndex)}/>
            </Row>
          </Col>
        )}
      </Row>

      {/* Bảng số câu hỏi nằm ở góc phải với thanh cuộn */}
      <div
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: isSticky ? '50%' : '10vh',
          right: '10px',
          width: '250px',
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '0.5rem',
          backgroundColor: '#f9f9f9',
          transform: isSticky ? 'translateY(-50%)' : 'none',
          transition: 'top 0.3s ease-in-out',
        }}
      >
        <Row gutter={[8, 8]}>
          {array.map((item, index) => (
            <Col key={index} span={4}>
              <Button
                onClick={() => setCurrentQuestionIndex(item)}
                style={{
                  width: '100%',
                  padding: '0.3rem',
                  fontSize: '0.8rem',
                  backgroundColor: currentQuestionIndex === item || choosenAnswers.includes(item) ? '#1890ff' : '',
                  color: currentQuestionIndex === item ? '#fff' : '',
                  position: 'relative'
                }}
              >
                {item}
              </Button>
              <div style={{position:'absolute',top:'1px',right:'1px'}}>{flag.includes(item) ? <IoIosFlag color='red'/> : ''}</div>
            </Col>
          ))}
        </Row>
      </div>
    </Card>
  )
}

export default ToeicTest

