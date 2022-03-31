import axios from 'axios'
const token = localStorage.getItem('token')
const ClientApi = axios.create({
    baseURL: process.env.REACT_APP_HOST_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default ClientApi