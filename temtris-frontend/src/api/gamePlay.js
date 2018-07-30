import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:14666/api',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

const gameAPI = {
  join: () => instance.get('/login/join'),
}

export default gameAPI;