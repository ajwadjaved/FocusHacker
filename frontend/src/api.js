import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your Django backend URL

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
