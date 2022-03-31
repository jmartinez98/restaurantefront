import axios from 'axios'
const api = axios.create({
    baseURL: process.env.REACT_APP_HOST_URL

})

export const URL = process.env.REACT_APP_HOST_URL;

export default api