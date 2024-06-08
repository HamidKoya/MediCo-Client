import axios from "axios"

// const api = axios.create({baseURL:`http://localhost:3000`,withCredentials:true})

const api = axios.create({baseURL:`https://medico-server-b7s5.onrender.com`,withCredentials:true})

export default api