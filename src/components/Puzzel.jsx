import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Button, Row, Col, Modal, message } from 'antd';
import Confetti from 'react-confetti';
import './puzzel.scss';

const Puzzle = forwardRef(({ onMove }, ref) => {
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  useImperativeHandle(ref, () => ({
    resetPuzzle() {
      initializePuzzle();
    },
    shufflePuzzle() {
      const shuffledTiles = shuffleArray([...Array(15).keys()].map(x => x + 1).concat(null));
      if (isSolvable(shuffledTiles)) {
        setTiles(shuffledTiles);
        setIsSolved(false);
        onMove(0);
      } else {
        message.error('Not solvable');
      }
    },
    helpMe() {
      // Here, we'll use a dummy function for demonstration purposes
      makeOneMove();
    },
  }));

  const initializePuzzle = () => {
    const initialTiles = shuffleArray([...Array(15).keys()].map(x => x + 1).concat(null));
    setTiles(initialTiles);
    setIsSolved(false);
    onMove(0);
  };

  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const isSolvable = (tiles) => {
    let inversions = 0;
    const array = tiles.filter(tile => tile !== null);

    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] > array[j]) {
          inversions++;
        }
      }
    }

    const emptyRow = Math.floor(tiles.indexOf(null) / 4);
    return (inversions + emptyRow) % 2 === 0;
  };

  const moveTile = (index) => {
    const newTiles = tiles.slice();
    const emptyIndex = newTiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    if (validMoves.includes(index)) {
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      onMove(prev => prev + 1);
      checkIfSolved(newTiles);
    }
  };

  const checkIfSolved = (tiles) => {
    const winningTiles = [...Array(15).keys()].map(x => x + 1).concat(null);
    if (JSON.stringify(tiles) === JSON.stringify(winningTiles)) {
      setIsSolved(true);
    }
  };

  const makeOneMove = () => {
    // Placeholder function for solving one move at a time
    const emptyIndex = tiles.indexOf(null);
    const newTiles = tiles.slice();
    const potentialMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    const validMoves = potentialMoves.filter(index => index >= 0 && index < 16);
    if (validMoves.length > 0) {
      const moveIndex = validMoves[Math.floor(Math.random() * validMoves.length)];
      [newTiles[emptyIndex], newTiles[moveIndex]] = [newTiles[moveIndex], newTiles[emptyIndex]];
      setTiles(newTiles);
      onMove(prev => prev + 1);
      checkIfSolved(newTiles);
    }
  };

  return (
    <div className="puzzle-container">
      {isSolved && <Confetti />}
      <Row gutter={[8, 8]}>
        {tiles.map((tile, index) => (
          <Col key={index} span={6}>
            <Button
              className="puzzle-tile"
              onClick={() => moveTile(index)}
              disabled={!tile}
            >
              {tile}
            </Button>
          </Col>
        ))}
      </Row>
      <Modal visible={isSolved} footer={null} closable={false}>
        <h2>Congratulations, you won!</h2>
      </Modal>
    </div>
  );
});

export default Puzzle;
