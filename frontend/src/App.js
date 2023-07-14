import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import DialogBox from './DialogBox';
import CompletedEntries from './CompletedEntries';
import Footer from './Footer';
import { saveEntry, getWorkDiary } from './api';
// import { updateEntry } from './api';

const App = () => {
  const [completedEntries, setCompletedEntries] = useState([]);
  const [totalTime, setTotalTime] = useState('');
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

  // const handleEditEntry = (entry) => {
  //   setSelectedEntry(entry);
  // };

  // const handleSaveEntry = async (updatedEntry) => {
  //   try {
  //     await updateEntry(updatedEntry.id, updatedEntry);
  //     setSelectedEntry(null);
  //     fetchWorkDiaryEntries();
  //   } catch (error) {
  //     console.error('Error updating entry:', error);
  //   }
  // };

  
  const handleRowClick = (entryId) => {
    console.log('Clicked entryId:', entryId);
    // Perform any desired action with the entryId
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
    <>
      <NavBar />
      <DialogBox onStartClick={handleStartClick} />
      <CompletedEntries entries={completedEntries} onRowClick={handleRowClick} />
      {/* <CompletedEntries
        entries={completedEntries}
        // onEditEntry={handleEditEntry}
        // onSaveEntry={handleSaveEntry}
      /> */}
      <Footer />
    </>
  );
};

export default App;
