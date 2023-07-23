import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  ChakraProvider,
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

import { updateEntry } from './api'; 

const theme = extendTheme({}); // Create an empty theme object

const CompletedEntries = ({ entries, fetchWorkDiaryEntries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedEntry, setEditedEntry] = useState({
    entry: '',
    tag: '',
    description: '',
  });

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setEditedEntry({
      entry: entry.entry,
      tag: entry.tag,
      description: entry.description,
    });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare the updated entry to be sent to the backend
      const updatedEntryForBackend = {
        entry: editedEntry.entry,
        tag: editedEntry.tag,
        description: editedEntry.description,
        time_taken: selectedEntry.time_taken, // Keep the original time_taken value
      };
  
      await updateEntry(selectedEntry.id, updatedEntryForBackend);
  
      // Close the modal and update the state with the edited entry
      setIsOpen(false);
      setSelectedEntry({
        ...selectedEntry,
        entry: editedEntry.entry,
        tag: editedEntry.tag,
        description: editedEntry.description,
        time_taken: selectedEntry.time_taken, // Keep the original time_taken value
      });

      // Fetch the updated entries from the backend and update the state using fetchWorkDiaryEntries
      await fetchWorkDiaryEntries();

    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };
  
  return (
    <ChakraProvider>
      <Box
        width="60%"
        margin="0 auto"
        border="2px solid black"
        borderRadius="md"
        p={2}
        mt={0}
        overflow="auto"
        maxHeight="500px"
      >
        <Heading as="h2" size="md" mb={4}>
          Work Diary
        </Heading>
        {entries.length > 0 ? (
          <Table
            variant="simple"
            colorScheme="pink"
            borderWidth="0px"
            borderRadius="md"
            size="sm"
          >
            <Thead>
              <Tr>
                <Th fontSize="md">Entry</Th>
                <Th fontSize="md">Tag</Th>
                <Th fontSize="md">Description</Th>
                <Th fontSize="md">Time Worked</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.slice(0).reverse().map((entry, index) => (
                <Tr
                  key={index}
                  onClick={() => handleRowClick(entry)}
                  style={{ cursor: 'pointer' }}
                >
                  <Td fontSize="md">{entry.entry}</Td>
                  <Td fontSize="md">{entry.tag}</Td>
                  <Td fontSize="md">
                    {entry.description || 'No description'}
                  </Td>
                  <Td fontSize="md">{entry.time}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No completed entries yet.</Text>
        )}

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            borderTop: `4px solid #0A192F`,
            width: '70%',
            maxHeight: '75vh',
          }}
        >
          <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold" pb={2}>
            Edit
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Entry</FormLabel>
              <Input
                value={editedEntry.entry}
                onChange={(e) =>
                  setEditedEntry({ ...editedEntry, entry: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Tag</FormLabel>
              <Input
                value={editedEntry.tag}
                onChange={(e) =>
                  setEditedEntry({ ...editedEntry, tag: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={editedEntry.description}
                onChange={(e) =>
                  setEditedEntry({
                    ...editedEntry,
                    description: e.target.value,
                  })
                }
                maxH="100px" // Set the maximum height for the Textarea
                overflow="auto" // Set the overflow property to auto to control overflow behavior
                // resize="none" // Disable resizing of the Textarea
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges} size="md">
              Save Changes
            </Button>
            <Button onClick={handleCloseModal} size="sm">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default CompletedEntries;
