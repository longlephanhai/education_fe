import React, { useEffect, useState } from 'react';
import './About.scss';
import axios from 'axios';
import Summary from '../../../API';
const About = () => {
  const [data, setData] = useState('')
  const fetchApi = async () => {
    try {
      const response = await axios.get(Summary.getAboutUs.url)
      if (response.data.statusCode === 200) {
        setData(response.data.data.content)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#e0f7fa",
      minHeight: "100vh",
      boxSizing: "border-box",
    },
    content: {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      color: "#333333",
      lineHeight: "1.6",
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.content} dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default About;
