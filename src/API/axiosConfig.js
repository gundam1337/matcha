// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
      },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Retrieve the access token from local storage

    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken = ',accessToken)
    if (accessToken) {
      // Set the Authorization header
      config.headers['Authorization'] = `${accessToken}`;
    }
    // Add more headers or configs if needed
    return config;
  },
  error => {
    console.log("error")
    return Promise.reject(error);
  }
);

// Optionally, you can add a response interceptor to handle global response errors

export default axiosInstance;
