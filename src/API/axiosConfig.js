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
    if (accessToken) {
      // Set the Authorization header
      config.headers['x-access-token'] = `${accessToken}`;
    }
    // Add more headers or configs if needed
    return config;
  },
  error => {
    console.log("error")
    return Promise.reject(error);
  }
);


export default axiosInstance;
