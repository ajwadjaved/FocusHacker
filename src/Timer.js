import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [studyBlocks, setStudyBlocks] = useState(Array(5).fill(false)); //5 instances of study blocks
  const [currentBlock, setCurrentBlock] = useState(0);
  const [seconds, setSeconds] = useState(5); //25 * 60 default
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
    setStudyBlocks([false, false, false, false, false]); //find way to streamline this
    setCurrentBlock(0);
    setSeconds(25 * 60);
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
      <nav className="navbar">
        <div className="navbar-brand">Simple Pomodoro</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/analytics">Analytics</a>
          </li>
          <li className="navbar-item">
            <a href="/about">About</a>
          </li>
          <li className="navbar-item dropdown">
            <span className="dropdown-toggle">Set Study Sessions</span>
            <div className="dropdown-menu">
              <a href="/session-1">5 Sessions</a>
              <a href="/session-2">4 Sessions</a>
              <a href="/session-3">3 Sessions</a>
            </div>
          </li>
        </ul>
      </nav>
      <h1 className="timer-title">Timer</h1>
      <p className="timer-text">Time: {formatTime(seconds)}</p>
      <div className="study-blocks">
        {studyBlocks.map((block, index) => (
          <div
            key={index}
            className={`study-block ${block ? 'complete' : ''}`}
          ></div>
        ))}
      </div>
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
