import axios from 'axios';

const axiosInst = axios.create({
  baseURL: 'http://localhost:7000/api/'
});

export default axiosInst;