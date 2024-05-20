import axios from 'axios'

const api = axios.create({
  baseURL: 'https://isep-indoor-api.onrender.com'
  //baseURL: 'http://localhost:3000'
})

export default api
