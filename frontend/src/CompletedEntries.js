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
  Input,
  Button,
  Flex,
  Textarea,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { updateEntry } from './api';

const theme = extendTheme({}); // Create an empty theme object

const CompletedEntries = ({ entries, onEditEntry, onSaveEntry }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setEditedFields({ ...entry });
  };

  const handleFieldChange = (e, field) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [field]: e.target.value,
    }));
  };

  const handleClose = () => {
    setSelectedEntry(null);
    setEditedFields({});
  };

  const handleSave = () => {
    if (selectedEntry) {
      onSaveEntry(selectedEntry.id, editedFields);
      setSelectedEntry(null);
      setEditedFields({});
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
                  _hover={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRowClick(entry)}
                >
                  <Td fontSize="md">
                    {entry.entry}
                  </Td>
                  <Td fontSize="md">
                    {`@${entry.tag}`}
                  </Td>
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
      </Box>
      {selectedEntry && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="300px"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h3" size="md" mb={4}>
            Edit Entry
          </Heading>
          <Flex flexDirection="column">
            <Text fontSize="sm" color="gray.500" mb={2}>
              Entry:
            </Text>
            <Input
              value={editedFields.entry}
              onChange={(e) => handleFieldChange(e, 'entry')}
              isReadOnly
            />
          </Flex>
          <Flex flexDirection="column" mt={2}>
            <Text fontSize="sm" color="gray.500" mb={2}>
              Tag:
            </Text>
            <Input
              value={`@${editedFields.tag}`}
              onChange={(e) => handleFieldChange(e, 'tag')}
              isReadOnly
            />
          </Flex>
          <Flex flexDirection="column" mt={2}>
            <Text fontSize="sm" color="gray.500" mb={2}>
              Description:
            </Text>
            <Textarea
              value={editedFields.description}
              onChange={(e) => handleFieldChange(e, 'description')}
              isReadOnly
              resize="vertical"
            />
          </Flex>
          <Flex justifyContent="flex-end" mt={4}>
            <Button
              colorScheme="blue"
              leftIcon={<CheckIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<CloseIcon />}
              ml={2}
              onClick={handleClose}
            >
              Close
            </Button>
          </Flex>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default CompletedEntries;