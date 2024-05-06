import axios, {AxiosInstance} from 'axios';

const api : AxiosInstance = axios.create({ 
  baseURL: "https://www.universidadefenabrave.com.br/V3API/api/"
});

export default api;