import React, { useState } from 'react';
import NavBar from './Navbar';
import DialogBox from './DialogBox';
import CompletedEntries from './CompletedEntries';
import Footer from './Footer';

const App = () => {
  const [completedEntries, setCompletedEntries] = useState([]);
  const [totalTime, setTotalTime] = useState("");

  const handleStartClick = (inputValue, totalTime, tagValue) => {
    // console.log("User input:", inputValue);
    setCompletedEntries((prevEntries) => [...prevEntries, { entry: inputValue, time: totalTime, tag: tagValue }]);
    setTotalTime(totalTime);
  };

  return (
    <>
      <NavBar /> 
      <DialogBox onStartClick={handleStartClick} />
      <CompletedEntries entries={completedEntries} />
      <Footer />
    </>
  );
};


export default App;
