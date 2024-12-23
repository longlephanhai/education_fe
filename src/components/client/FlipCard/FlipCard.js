import React, { useState } from 'react';
import './FlipCard.scss';
import useSpeechSynthesis from '../../../helper/useSpeechSynthesis'
import { HiMiniSpeakerWave } from 'react-icons/hi2';
const FlipCard = ({ item, onNext }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const { speak } = useSpeechSynthesis();
  return (
    <div className="flip-card" onClick={handleFlip}>
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <b>{item?.vocb}: </b>
          <p>{item?.pronounce}</p>
          <HiMiniSpeakerWave cursor={"pointer"} onClick={(e) => {
            speak({ text: item.vocb })
            e.stopPropagation();
          }} styles={{ fontSize: '40px' }} />
          <button
            className="flip-card-button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            Từ kế
          </button>
        </div>
        <div className="flip-card-back">
          <img width={100} src={item.img} alt='' />
          <p>{item?.meaning}</p>
          <button
            className="flip-card-button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            Từ kế
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
