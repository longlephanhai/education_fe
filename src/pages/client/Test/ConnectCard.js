/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Summary from '../../../API';
import './ConnectCard.scss';

const ConnectCard = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(0);
  const fetchApi = async () => {
    try {
      const response = await axios.post(Summary.getRandowmQuestion.url, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return;
    console.log(answer);
    if (answer.isCorrect) {
      setCorrect(prev=>prev+1);
    }
    setSelectedAnswer(answer);
    setIsAnswerCorrect(answer.isCorrect);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswerCorrect(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (currentQuestionIndex >= data.length) {
    return <div className="quiz-finish">Quiz Complete! You’ve finished all questions.({correct}/{data.length})</div>;
  }

  const currentQuestion = data[currentQuestionIndex];

  return (
    <div className="quiz">
      <div className="quiz-container">
        <div className="question">
          <p>{currentQuestion.question}</p>
        </div>

        <div className="answers">
          {currentQuestion.answers.map((answer, index) => (
            <div
              key={index}
              className={`answer ${selectedAnswer && answer.text === selectedAnswer.text
                ? answer.isCorrect
                  ? 'correct'
                  : 'incorrect'
                : ''
                }`}
              onClick={() => handleAnswerSelect(answer)}
            >
              {answer.text}
            </div>
          ))}
        </div>

        {showResult && (
          <div className={`result ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
            {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
          </div>
        )}

        {showResult && (
          <button onClick={handleNextQuestion} className="next-button">
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectCard;
