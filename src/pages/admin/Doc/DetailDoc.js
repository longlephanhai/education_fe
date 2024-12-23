/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Summary from '../../../API'

const DetailDoc = () => {
  const location = useLocation()
  const { id } = location.state
  const [data, setData] = useState({})
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.detailDoc.url + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (response.data.statusCode === 200) {
        response.data.data.file = `${process.env.REACT_APP_URL_BACKEND}/${response.data.data.file.replace(/\\/g, '/')}`
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  console.log(data);

  return (
    <div>
      <p><strong>File Path:</strong> {data.file}</p>
    </div>
  )
}

export default DetailDoc
