import axios from 'axios';

const api = axios.create({
    baseURL: 'https://isep-indoor-api.onrender.com',
});

export default api;