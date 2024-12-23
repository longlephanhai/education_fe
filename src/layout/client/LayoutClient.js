/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/client/Header/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/client/Footer/Footer';
const LayoutClient = () => {

  return (
    <div>
      <Header />
      <ToastContainer />
      <div styles={{ margin: 20, minHeight: '100vh' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default LayoutClient
