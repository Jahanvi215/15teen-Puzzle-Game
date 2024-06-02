import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Typography, message } from 'antd';

const { Text: AntText } = Typography;

const Buttons = ({ onReset, onStartPause, onShuffle, onHelpMe, moves, timer, isSolvable }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [blur, setBlur] = useState(true); // Initial blur state

  const formattedTime = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    onStartPause(!isRunning);
    setBlur(false); // Remove blur when starting the game
  };

  const handleReset = () => {
    onReset();
    setIsRunning(false);
    setBlur(true); // Apply blur when resetting the game
  };

  const handleShuffle = () => {
    onShuffle();
  };

  const handleHelpMe = () => {
    onHelpMe();
  };

  const handleBlurClick = () => {
    if (!isRunning) {
      handleStartPause(); // Start the game if not running
    }
  };

  useEffect(() => {
    if (!isSolvable) {
      message.error('Not solvable');
    }
  }, [isSolvable]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Row justify="center" align="middle" className='mb-20'>
        <Col span={24}>
            
          <AntText strong className='heading'>Fifteen Puzzle Game</AntText>
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[16, 16]} className='mb-20'>
        <Col span={4}>
          <div className='move-div'>
            <AntText strong>Moves</AntText>
            <div>{moves}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className='move-div'>
            <AntText strong>Timer</AntText>
            <div>{formattedTime()}</div>
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col span={2}>
          <Button  onClick={handleReset} className='puzzel-btn'>Reset</Button>
        </Col>
        <Col span={2}>
          <Button type="default" onClick={handleStartPause} className='puzzel-btn'>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </Col>
        <Col span={2}>
          <Button  onClick={handleShuffle} className='puzzel-btn'>Shuffle</Button>
        </Col>
        <Col span={2}>
          <Button onClick={handleHelpMe} disabled={!isSolvable} className='puzzel-btn'>Help Me</Button>
        </Col>
      </Row>
      {blur && ( // Apply blur effect and overlay text
        <div className="overlay" onClick={handleBlurClick}>
          <AntText strong className='start-text'>Play!</AntText>
        </div>
      )}
    </div>
  );
};

export default Buttons;
