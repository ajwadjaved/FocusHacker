import React, { useState } from 'react';
import NavBar from './Navbar';
import DialogBox from './DialogBox';
import CompletedEntries from './CompletedEntries';
import Footer from './Footer';
import { saveEntry } from './api'; // Import the saveEntry function from api.js

const App = () => {
  const [completedEntries, setCompletedEntries] = useState([]);
  const [totalTime, setTotalTime] = useState('');

  const handleStartClick = async (inputValue, totalTime, tagValue) => {
    try {
      const entry = {
        entry: inputValue,
        tag: tagValue,
        description: "", // Add a description if needed
        time_taken: parseInt(totalTime),
      };
  
      setCompletedEntries((prevEntries) => [
        ...prevEntries,
        { entry: inputValue, time: totalTime, tag: tagValue },
      ]);
      setTotalTime(totalTime);
  
      // Call the saveEntry function from api.js to save the entry
      await saveEntry(entry);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
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
