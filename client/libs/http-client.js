import i18n from '@/libs/i18n';
import Axios from 'axios';
import AuthService from '@/services/api/auth.service';

let options = {
  baseURL: process.env.NODE_ENV === 'development' ?
    `${window.location.protocol}//${ window.location.host.replace(/8080/, Number('3000')) }/api` : '/api',
  headers: {
    'Accept': 'application/json',
    'Accept-Language': i18n.locale,
    'Content-Type': 'application/json; charset=utf-8'
  }
};

console.log(options)
const httpClient = Axios.create(options);

httpClient.interceptors.request.use(config => {
  if (AuthService.getAuthToken()) config.headers['Authorization'] = AuthService.getAuthToken();

  return config
});

httpClient.interceptors.response.use(response => {
  if (response.config.url.split('/').pop() === 'logout') AuthService.removeAuthToken();

  return response;
});

class ApiClient {
  static get(url, conf = {}) {
    return httpClient.get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  static post(url, data = {}, conf= {}) {
    return httpClient.post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export default ApiClient;
