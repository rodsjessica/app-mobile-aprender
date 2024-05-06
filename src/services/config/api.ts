import axios, {AxiosInstance} from 'axios';

const api : AxiosInstance = axios.create({ 
  baseURL: "BASE_URL"
});

export default api;