import axios from 'axios'
const token = localStorage.getItem('token')
const ClientApi = axios.create({
    baseURL: 'https://tesis-restaurant-api.herokuapp.com',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default ClientApi