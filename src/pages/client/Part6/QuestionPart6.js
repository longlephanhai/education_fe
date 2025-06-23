import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Summary from "../../../API"
import { Button, Card, Col, message, Modal, Popconfirm, Radio, Row, Statistic } from "antd"
import { IoIosFlag } from "react-icons/io"
import Notify from "../../../components/client/Notify/Notify"
const { Countdown } = Statistic;
const QuestionPart6 = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [data, setData] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState([])

  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getQuestionPart6.url + params.id, {
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
      [questionNumber - 130]: value
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
  for (let i = 1; i <= data.length; i++) {
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
    navigate(`/practice/result/${params.id}`, { state: { score, correctAnswers, answers } })
  }
  const [flag, setFlag] = useState([])
  const handleFlag = (questionNumber) => {
    if (!flag.includes(questionNumber + 1)) {
      setFlag([...flag, questionNumber + 1])
    } else {
      setFlag(flag.filter(item => item !== questionNumber + 1))
    }
  }

  // hiện thông báo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    showModal()
  }, [])
  // autoplay audio
  const audioRef = useRef(null);
  const handleOk = () => {
    setIsModalOpen(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
    setDeadline(Date.now() + 10 * 60 * 1000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
    setDeadline(Date.now() + 10 * 60 * 1000);
  };

  // countdowwn
  const [deadline, setDeadline] = useState(0);
  const handleConfirm = () => {
    const modalInstance = Modal.confirm({
      title: 'Thông báo',
      content: 'Bạn đã hết thời gian làm bài',
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <Button
            onClick={() => {
              handleSubmit();
              modalInstance.destroy();
            }}
          >
            Nộp
          </Button>
        </>
      ),
    });
  };

  const onFinish = () => {
    handleConfirm()
    audioRef.current.pause();
  };

  // confirm
  const confirm = (e) => {
    message.success('Nộp bài thành công');
    handleSubmit()
  };
  return (
    <Card style={{ minHeight: '100vh', marginTop: '10vh', padding: '2rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', position: 'relative' }}>


      <Row>
        <Col span={12}>
          <Countdown title="Thời gian làm bài" value={deadline} onFinish={onFinish} />
        </Col>
      </Row>

      <Row>
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc chắn muốn nộp bài không?"
          onConfirm={confirm}
          okText="Nộp"
          cancelText="Hủy"
        >
          <Button type='primary' >
            Nộp bài
          </Button>
        </Popconfirm>
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
              name={`${data[currentQuestionIndex].questionNumber - 130}`}
              value={answers[data[currentQuestionIndex].questionNumber - 130]}
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
            <Row gutter={[16, 16]} style={{ marginTop: '1rem', gap: '1rem' }}>
              <Button onClick={handlePreQuestion} >
                Câu trước
              </Button>
              <Button onClick={handleNextQuestion} >
                Câu kế
              </Button>
              <Button icon={<IoIosFlag />} onClick={() => handleFlag(currentQuestionIndex)} />
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
                onClick={() => setCurrentQuestionIndex(item - 1)}
                style={{
                  width: '100%',
                  padding: '0.3rem',
                  fontSize: '0.8rem',
                  backgroundColor: currentQuestionIndex === item - 1 || choosenAnswers.includes(item) ? '#1890ff' : '',
                  color: currentQuestionIndex === item - 1 ? '#fff' : '',
                  position: 'relative'
                }}
              >
                {item}
              </Button>
              <div style={{ position: 'absolute', top: '1px', right: '1px' }}>{flag.includes(item) ? <IoIosFlag color='red' /> : ''}</div>
            </Col>
          ))}
        </Row>
      </div>
      <Notify time={10} question={data.length} showModal={showModal} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </Card>
  )
}

export default QuestionPart6
