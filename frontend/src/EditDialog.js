import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

const EditDialog = ({ entry, onSave, onClose }) => {
    const [editedEntry, setEditedEntry] = useState({ ...entry });
  
    const handleFieldChange = (e, field) => {
      setEditedEntry((prevEditedEntry) => ({
        ...prevEditedEntry,
        [field]: e.target.value,
      }));
    };
  
    const handleSaveClick = () => {
      onSave(editedEntry);
    };
  
    return (
      <div>
        {/* Render the dialog with input fields for editing */}
        <Input value={editedEntry.entry} onChange={(e) => handleFieldChange(e, 'entry')} />
        <Input value={editedEntry.tag} onChange={(e) => handleFieldChange(e, 'tag')} />
        <Input value={editedEntry.description} onChange={(e) => handleFieldChange(e, 'description')} />
        
        <Button onClick={handleSaveClick}>Save</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  };
  