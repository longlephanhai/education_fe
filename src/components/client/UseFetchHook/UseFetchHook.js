import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const UseFetchHook = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogle = async (response) => {
   
    // if (responseData.data.success) {
    //   toast.success(responseData.data.message)
    //   dispatch(signIn(responseData.data.data))
    //   navigate('/')
    // } else {
    //   toast.error(responseData.data.message)
    // }
  };
  return { loading, error, handleGoogle };
}

export default UseFetchHook
