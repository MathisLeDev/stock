import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL || 'https://api.example.com',
    timeout: process.env.REACT_APP_TIMEOUT ? parseInt(process.env.EXPO_AXIOS_TIMEOUT) : 10000,
});

axiosInstance.interceptors.request.use( (config) => {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem('user') || '{}');

    if (token) {
        config.headers.Authorization = `Bearer ${token.token}`;
    }
    console.log('REQUEST: ', config.headers.Authorization);

    return config;
},  (error) => {
    // Do something with request error
    return Promise.reject(error);
});

/**
 * Executed before each request
 *
 * Following cases are handled:
 * - 500 ERROR FROM SERVER
 * - 401 ERROR FROM SERVER
 * - DEFAULT ERROR
 *
 * TODO: Handle token expiration
 */
axiosInstance.interceptors.response.use(
    response => {
        console.log('SUCCESS: ', response.request._url);
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    console.error('ERROR: 500 from server: ', error.response);
                    break;
                case 401:
                    console.error('ERROR: 401 from server: ', error.response);
                    break;
                default:
                    console.error('ERROR: ', error.response, error.response.status);
                    break;
            }
        } else {
            console.error('ERROR: ', error.message, 'REQUEST: ', error.request._url);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
