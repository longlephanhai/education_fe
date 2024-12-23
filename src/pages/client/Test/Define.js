/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Summary from '../../../API'
import { useParams } from 'react-router-dom'
import './Define.scss'

const Define = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const [selectedPairs, setSelectedPairs] = useState([])
  const [shuffledWords, setShuffledWords] = useState([])
  const [shuffledMeanings, setShuffledMeanings] = useState([])
  const [isComplete, setIsComplete] = useState(false);
  const fetchApi = async () => {
    try {
      const response = await axios.post(Summary.getRandowmVocabulary.url, params, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      setShuffledWords(shuffleArray(data.map((vocab) => {
        return {
          _id: vocab._id,
          word: vocab.vocb
        }
      })))
      setShuffledMeanings(shuffleArray(data.map((vocab) => {
        return {
          _id: vocab._id,
          meaning: vocab.meaning
        }
      })))
    }
  }, [data])

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const handleSelect = (item, type) => {
    setSelectedPairs((prevPairs) => [...prevPairs, { item, type }])

    if (selectedPairs.length === 1) {
      const first = selectedPairs[0]
      const second = { item, type }
      if (first.type !== second.type && first.item._id === second.item._id) {
        setShuffledWords((prevWords) => prevWords.filter(word => word._id !== first.item._id))
        setShuffledMeanings((prevMeanings) => prevMeanings.filter(meaning => meaning._id !== first.item._id))
      }
      if (shuffledWords.length === 1) {
        setIsComplete(true);
      }
      setSelectedPairs([])
    }
  }

  const reset = () => {
    // Xáo trộn lại từ và nghĩa, và đặt lại trạng thái
    setShuffledWords(shuffleArray(data.map((vocab) => ({
      _id: vocab._id,
      word: vocab.vocb,
    }))));
    setShuffledMeanings(shuffleArray(data.map((vocab) => ({
      _id: vocab._id,
      meaning: vocab.meaning,
    }))));
    setSelectedPairs([]);
    setIsComplete(false);
  };

  return (
    <div className="match-words">
      <div className="words">
        {shuffledWords.map((word, index) => (
          <div
            key={index}
            className={selectedPairs.some(pair => pair.item._id === word._id && pair.type === 'word') ? 'selected' : 'not-selected'}
            onClick={() => handleSelect(word, 'word')}
          >
            {word.word}
          </div>
        ))}
      </div>
      <div className="meanings">
        {shuffledMeanings.map((meaning, index) => (
          <div
            key={index}
            className={selectedPairs.some(pair => pair.item._id === meaning._id && pair.type === 'meaning') ? 'selected' : ''}

            onClick={() => handleSelect(meaning, 'meaning')}
          >
            {meaning.meaning}
          </div>
        ))}
      </div>
      {isComplete && (
        <button className="reset-button" onClick={reset}>
          Làm lại
        </button>
      )}
    </div>
  )
}

export default Define
