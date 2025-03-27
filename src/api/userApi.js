import axios from "axios";

// const BASE_URL = "http://localhost:7000/api/auth"; // adjust as needed
const BASE_URL = process.env.REACT_APP_BASE_URL_AUTH;

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  
  // Store JWT token in localStorage (or sessionStorage if you prefer)
  localStorage.setItem("token", response.data.token);

  return response.data;
};
