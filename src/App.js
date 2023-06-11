import React from 'react';
import { useState } from 'react';
import DialogBox from './DialogBox';

const App = () => {
  const [showDialog, setShowDialog] = useState(true);

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && <DialogBox onDialogClose={handleDialogClose} />}
    </>
  );
};

export default App;
