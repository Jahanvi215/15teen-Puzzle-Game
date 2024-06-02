import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/reset.css'; // Updated import for Ant Design CSS
import { Layout, Typography } from 'antd';
import "./App.css";
import Buttons from './components/Buttons';
import Puzzle from './components/Puzzel';
import Footer from './components/Footer';

const { Content } = Layout;

const App = () => {
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSolvable, setIsSolvable] = useState(true);
  const puzzleRef = useRef(null);

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const handleReset = () => {
    setMoves(0);
    setTimer(0);
    setIsRunning(false);
    puzzleRef.current.resetPuzzle();
  };

  const handleStartPause = (running) => {
    setIsRunning(running);
  };

  const handleShuffle = () => {
    puzzleRef.current.shufflePuzzle();
  };

  const handleHelpMe = () => {
    puzzleRef.current.helpMe();
  };

  return (
    <Layout>
      <Content style={{ padding: '20px', position: 'relative' }}>
        <div className={`app-container ${!isRunning ? 'blurred' : ''}`}>
          <Buttons
            onReset={handleReset}
            onStartPause={handleStartPause}
            onShuffle={handleShuffle}
            onHelpMe={handleHelpMe}
            moves={moves}
            timer={timer}
            isSolvable={isSolvable}
          />
          <Puzzle ref={puzzleRef} onMove={setMoves} />
        </div>
      <Footer/>
      </Content>
    </Layout>
  );
};

export default App;
