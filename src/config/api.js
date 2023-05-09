import axios from "axios";

export const ApiClient = axios.create({
  baseURL: 'https://6459bd9d8badff578e138c97.mockapi.io/api/v1/',
  timeout: 5000,
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });