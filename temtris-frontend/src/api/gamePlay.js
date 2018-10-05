import axios from 'axios';
const {
  SERVER_URL: apiServer
} = process.env;
const instance = axios.create({
  baseURL: `${apiServer}/api`,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

const gameAPI = {
  join: () => instance.get('/login/join'),
}

export default gameAPI;