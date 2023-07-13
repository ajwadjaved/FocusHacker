import React, { useState, useEffect } from 'react';
// import moment from 'moment'; 

import NavBar from './Navbar';
import DialogBox from './DialogBox';
import CompletedEntries from './CompletedEntries';
import Footer from './Footer';
import { saveEntry, getWorkDiary } from './api';

const App = () => {
  const [completedEntries, setCompletedEntries] = useState([]);
  const [totalTime, setTotalTime] = useState('');

  useEffect(() => {
    // Fetch work diary entries on component mount
    fetchWorkDiaryEntries();
  }, []);

  const fetchWorkDiaryEntries = async () => {
    try {
      const entries = await getWorkDiary();
      setCompletedEntries(entries);
    } catch (error) {
      console.error('Error retrieving work diary entries:', error);
    }
  };

  const handleStartClick = async (inputValue, totalTime, tagValue) => {  
    try {
      // console.log(typeof(totalTime));
      const entry = {
        entry: inputValue,
        tag: tagValue,
        description: '', // Add a description if needed
        time_taken: totalTime, // Convert to datetime format
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
