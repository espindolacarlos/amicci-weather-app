import axios from 'axios';

const axiosInstance = (baseUrl: string) => axios.create({
    baseURL: baseUrl, // Replace with your API base URL
    timeout: 10000, // Optional: Set a timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default axiosInstance;