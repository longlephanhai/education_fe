import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Summary from '../../../API';
import { Card, Col, Row } from 'antd';
import useSpeechSynthesis from '../../../helper/useSpeechSynthesis';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { toast } from 'react-toastify';
const VocabSaved = () => {
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getFavourite.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.data.statusCode === 200) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  console.log(data);

  const { speak } = useSpeechSynthesis();
  const checkType = (type) => {
    if (type === "noun") {
      return "(n)"
    } else if (type === "verb") {
      return "(v)"
    } else if (type === "adjective") {
      return "(adj)"
    } else if (type === "adverb") {
      return "(adv)"
    } else if (type === "preposition") {
      return "(prep)"
    } else if (type === "conjunction") {
      return "(conj)"
    } else if (type === "interjection") {
      return "(interj)"
    } else if (type === "pronoun") {
      return "(pron)"
    } else if (type === "numeral") {
      return "(num)"
    }
  }


  const handleFavorite = async (vocbId) => {
    try {
      const response = await axios.post(Summary.addFavourite.url, { vocbId: vocbId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleCancelFavorite = async (vocbId) => {
    try {
      const response = await axios.delete(Summary.cancelFavourite.url + `/${vocbId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      toast.success(response.data.message)
      fetchApi()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <Card title={`Từ vựng đã lưu (${data.length})`} style={{ minHeight: '100vh' }}>
      {data.map((item, index) => (
        <Card style={{ width: '100%', marginBottom: '10px', padding: '10px' }} key={index}>
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            {/* Biểu tượng loa */}
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4A90E2',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
              }}
              onClick={() => speak({ text: item.vocbId.vocb })}
            >
              <HiSpeakerWave color="white" />
            </Col>

            {/* Nội dung từ vựng */}
            <Col flex="1" style={{ padding: '0 10px' }}>
              <div>
                <b>{item.vocbId.vocb}</b> <span> {item.vocbId.pronounce}</span>
              </div>
              <div>
                <i>{checkType(item.vocbId.type)}</i>
                <span> - {item.vocbId.meaning}</span>
              </div>
              {item.vocbId.example && <div><b>Ví dụ:</b> {item.vocbId.example}</div>}
            </Col>

            {/* Biểu tượng yêu thích */}
            <Col>
              {
                item.isFavourite ?
                  <FaStar color="orange" cursor="pointer" onClick={() => handleCancelFavorite(item.vocbId._id)} />
                  :
                  <CiStar cursor="pointer" onClick={() => handleFavorite(item.vocbId._id)} />
              }
            </Col>
          </Row>
        </Card>
      ))}
    </Card>

  )
}
export default VocabSaved
