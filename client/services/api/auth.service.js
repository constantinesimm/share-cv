import ApiClient from '@/libs/http-client';
import Storage from '@/libs/storage';
const storageKey = 'share_auth';

class AuthService {
  static setAuthToken(token) {
    return Storage.setItem(storageKey, token)
  }
  static getAuthToken() {
    return Storage.setItem(storageKey)
  }
  static removeAuthToken() {
    return Storage.setItem(storageKey)
  }

  static endPoints(route) {
    const url = {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      REGISTER_COMPLETE: '/auth/register/confirm',
      PASS_RESET: '/auth/password/reset',
      PASS_CONFIRM: 'auth/password/confirm',
      TOKEN_VERIFY: '/auth/token/verification'
    };

    return url[route];
  }

  static request(url, data) {
    return ApiClient.post(this.endPoints(url), data)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response.data))
  }
}

export default AuthService;
