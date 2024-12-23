/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Summary from '../../../API';
import FlipCard from '../../../components/client/FlipCard/FlipCard';
import './FlashCard.scss'
const FlashCard = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchApi = async () => {
    try {
      const response = await axios.get(
        `${Summary.getCategory.url}${params.slug}/${params.title}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className='flash-card'>
      {data.length > 0 && (
        <FlipCard data={data} item={data[currentIndex]} onNext={handleNextCard} />
      )}
    </div>
  );
};

export default FlashCard;
