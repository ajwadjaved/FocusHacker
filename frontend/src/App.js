import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Switch, and Route
import NavBar from './Navbar';
import DialogBox from './DialogBox';
import CompletedEntries from './CompletedEntries';
import Analysis from './Analysis'; // Import your analysis page component
import Footer from './Footer';
import { saveEntry, getWorkDiary } from './api';


const App = () => {
  const [completedEntries, setCompletedEntries] = useState([]);
  const [setTotalTime] = useState('');
  // const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
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
      const entry = {
        entry: inputValue,
        tag: tagValue,
        description: 'No Description',
        time_taken: totalTime,
      };

      setCompletedEntries((prevEntries) => [
        ...prevEntries,
        { entry: inputValue, time: totalTime, tag: tagValue },
      ]);
      setTotalTime(totalTime);
      console.log(entry)
      await saveEntry(entry);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <Router>
    <NavBar />
      <DialogBox onStartClick={handleStartClick} />
      <CompletedEntries
        entries={completedEntries}
        fetchWorkDiaryEntries={fetchWorkDiaryEntries}
      />
      <Routes>
      <Route path="/Analysis" component={Analysis} />
      </Routes>
    <Footer />
    </Router>
  );
};

export default App;