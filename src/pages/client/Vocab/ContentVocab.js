/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Summary from '../../../API'
import useSpeechSynthesis from '../../../helper/useSpeechSynthesis'
import { Card, Col, Row } from 'antd'
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa";
import './ContentVocab.scss'
import { toast } from 'react-toastify'
import { FaStar } from "react-icons/fa";
const ContentVocab = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getCategory.url + params.slug + `/${params.title}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const [active, setActive] = useState([])
  const actived = async () => {
    try {
      const response = await axios.get(Summary.getFavourite.url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setActive(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
    actived()
  }, [])



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
      actived()
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
      actived()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Row className="vocab-list" gutter={[8, 8]}  style={{marginTop:'10vh'}}>
      {data.map((item, index) => (
        <Col
          key={index}
          xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}
          className="vocab-list__item"
        >
          <Card className="vocab-card">
            <div className="vocab-card__audio">
              <HiMiniSpeakerWave cursor={"pointer"} onClick={() => speak({ text: item.vocb })} styles={{ fontSize: '40px' }} />
            </div>
            <img
              alt="example"
              src={item.img}
              className="vocab-card__image"
            />
            <div className="vocab-card__vocb">{item.vocb}</div>
            <div className="vocab-card__type">{checkType(item.type)}</div>
            <div className="vocab-card__pronounce">{item.pronounce}</div>
            <div className="vocab-card__meaning">{item.meaning}</div>
            <div className="vocab-card__example">{item.example}</div>
            {
              active.find((itemActive) => itemActive.vocbId._id === item._id) ? (
                <div className="vocab-card__favorite-active" onClick={() => handleCancelFavorite(item._id)}>
                  <FaStar />
                </div>
              ) :
                <div className="vocab-card__favorite" onClick={() => handleFavorite(item._id)}>
                  <FaRegStar />
                </div>
            }
          </Card>
        </Col>
      ))}
    </Row>
    
  )
}

export default ContentVocab
