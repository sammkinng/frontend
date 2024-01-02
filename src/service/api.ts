import { TableItem } from "../App"
import axios from 'axios';

const API_BASE_URL='https://backend-f2dq.onrender.com'


// Function to get all users
export const getAllUsers = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Function to get a user by ID
export const getUserById = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Function to create a new user
export const createUser = async (userData: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Function to update a user by ID
export const updateUser = async (userId: number, userData: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Function to delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

// Function to send email to users
export const sendEmail = async (emailData: any): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/send-email`, emailData);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

