import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [studyBlocks, setStudyBlocks] = useState([false, false, false, false, false]);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [seconds, setSeconds] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsRunning(false);
            markStudyBlockComplete();
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const markStudyBlockComplete = () => {
    const updatedStudyBlocks = studyBlocks.map((block, index) => {
      if (index === currentBlock) {
        return true;
      }
      return block;
    });

    setStudyBlocks(updatedStudyBlocks);
    setCurrentBlock(prevBlock => prevBlock + 1);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setStudyBlocks([false, false, false, false, false]);
    setCurrentBlock(0);
    setSeconds(1500);
    setIsRunning(false);
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer-container">
      <div className="stars-container">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="star"></div>
        ))}
      </div>
      <h1 className="timer-title">Timer</h1>
      <div className="study-blocks">
        {studyBlocks.map((block, index) => (
          <div
            key={index}
            className={`study-block ${block ? 'complete' : ''}`}
          ></div>
        ))}
      </div>
      <p className="timer-text">Time: {formatTime(seconds)}</p>
      <div className="timer-buttons">
        {!isRunning && (
          <>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
        {isRunning && <button onClick={handleStop}>Stop</button>}
      </div>
    </div>
  );
};

export default Timer;
