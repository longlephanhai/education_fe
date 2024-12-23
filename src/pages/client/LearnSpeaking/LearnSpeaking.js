import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Summary from '../../../API';
import './LearnSpeaking.scss'
import { Button } from 'antd';

const LearnSpeaking = () => {
  const [text, setText] = useState('');
  const [textAI, setTextAI] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setText(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Error with speech recognition:', event.error);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStart = async () => {
    recognition.start();
    try {
      const response = await axios.post(Summary.chatGpt.url, { text: '' }, {
        responseType: 'json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      });

      const initialQuestion = response.data.text;
      const audioData = response.data.audio;

      setTextAI(initialQuestion);
      setMessages([{ type: 'ai', text: initialQuestion }]);

      // Tạo URL cho âm thanh
      const audioBlob = new Blob([new Uint8Array(atob(audioData.split(',')[1]).split('').map(char => char.charCodeAt(0)))], { type: 'audio/mpeg' });
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(newAudioUrl);
    } catch (error) {
      console.error('Error fetching initial question:', error);
    }
  }

  const handleReSpeak = async () => {
    setText('');
  }
  const startListening = async () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!isListening) {
      setMessages(prevMessages => [...prevMessages, { type: 'user', text }]);

      try {
        const response = await axios.post(Summary.chatGpt.url, { text }, {
          responseType: 'json',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
        });


        const responseText = response.data.text;
        const audioData = response.data.audio;

        setTextAI(responseText);
        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'ai', text: responseText }
        ]);

        const audioBlob = new Blob([new Uint8Array(atob(audioData.split(',')[1]).split('').map(char => char.charCodeAt(0)))], { type: 'audio/mpeg' });
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
      } catch (error) {
        console.error('Error:', error);
      }
      setText('');
    } else {
      alert("Please stop listening before sending your message.");
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioUrl]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', padding: '20px' }}>
      <div className="chat">
        <h1 className="chat__title">Talk with AI</h1>
        <div className="chat__controls">
          <Button onClick={handleStart} className="chat__button chat__button--start-session">
            Bắt đầu cuộc trò chuyện
          </Button>
          <Button onClick={handleReSpeak} className="chat__button chat__button--repeat">
            Nói lại
          </Button>
          <Button
            type='primary'
            className="chat__button chat__button--start"
            onClick={startListening}
            disabled={isListening}
          >
            Bắt đầu nói
          </Button>
          <Button
            type='primary'
            className="chat__button chat__button--stop"
            onClick={stopListening}
            disabled={!isListening}
          >
            Dừng nói
          </Button>

        </div>

        <div ref={messagesEndRef} className="chat__messages" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat__bubble ${message.type === 'user' ? 'chat__bubble--right' : 'chat__bubble--left'}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form className="chat__form" onSubmit={handleSubmit}>
          <input
            className="chat__input"
            placeholder="Enter your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled
          />
          <Button type='primary' className="chat__form-button" htmlType="submit" disabled={isListening}>
            Gửi
          </Button>
        </form>

        {audioUrl && (
          <audio className="chat__audio" ref={audioRef} controls>
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
}

export default LearnSpeaking;
