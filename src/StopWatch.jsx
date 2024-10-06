import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // In milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Increment time by 10ms
      }, 10);
    }

    return () => clearInterval(intervalId); // Cleanup on unmount or stop
  }, [isRunning]);

  const startStopHandler = () => {
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const lapHandler = () => {
    setLaps([...laps, formatTime(time)]);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((time / 60000) % 60);
    const getMinutes = `0${minutes}`.slice(-2);
    return `${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time-display">
        <h2>{formatTime(time)}</h2>
      </div>
      <div className="controls">
        <button onClick={startStopHandler} className={isRunning ? 'stop' : 'start'}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={resetHandler} className="reset">Reset</button>
        {isRunning && <button onClick={lapHandler} className="lap">Lap</button>}
      </div>
      {laps.length > 0 && (
        <div className="laps">
          <h3>Laps</h3>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {lap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
