import axios from 'axios'
const API_URL = "https://6597a91a668d248edf23234d.mockapi.io"

const ApiService = axios.create({
    baseURL : API_URL,
    headers:{
        "Content-Type": "application/json"
    }
})

export default ApiService