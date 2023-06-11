import React, { useState } from 'react';
import DialogBox from './DialogBox';
import CompletedEntries from './CompletedEntries';

const App = () => {
  const [completedEntries, setCompletedEntries] = useState([]);

  const handleStartClick = (inputValue) => {
    console.log("User input:", inputValue);
    // Do something with the input value
    setCompletedEntries((prevEntries) => [...prevEntries, inputValue]);
  };

  return (
    <>
      <DialogBox onStartClick={handleStartClick} />
      <CompletedEntries entries={completedEntries} />
    </>
  );
};

export default App;
