import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your Django backend URL

// Function to make a GET request to retrieve the work diary entries
export const getWorkDiary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/save-entry/`);
    const entries = response.data.map((entry) => ({
      ...entry,
      time: entry.time_taken, // Map the "time_taken" field to "time" field
    }));
    return entries; // Return the modified entries data
  } catch (error) {
    console.error('Error retrieving work diary entries:', error);
    throw error;
  }
};

// Function to make a POST request to save the completed entry
export const saveEntry = async (entry) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/save-entry/`, entry);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error saving completed entry:', error);
    throw error; // Throw the error for error handling in the component
  }
};

// Function to make a PUT request to edit a existing entry
export const updateEntry = async (entryId, updatedEntry) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/save-entry/${entryId}/`, updatedEntry);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error; // Throw the error for error handling in the component
  }
};

// Function to make a POST request to sign in with the provided email
export const signIn = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/sign-in/`, { email });
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error signing in:', error);
    throw error; // Throw the error for error handling in the component
  }
};