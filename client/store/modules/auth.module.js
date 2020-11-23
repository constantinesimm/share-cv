import AuthService from '@/services/api/auth.service';
import ApiClient from '@/libs/http-client';
let state = {
  status: null,
  user: null,
  isAuthenticated: false,
  isFirstLoginComplete: false
};

const mutations = {
  AUTH_REQUEST(state) {
    state.status = 'pending'
  },
  AUTH_ERROR(state) {
    state.status = 'error'
  },
  AUTH_LOGIN(state, payload) {
    state.status = 'success';
    state.user = payload;
    state.isAuthenticated = true;
    state.isFirstLoginComplete = payload.isFirstLoginComplete;
  },
  AUTH_LOGOUT(state) {
    state.status = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isFirstLoginComplete = false;
  },
  AUTH_UPDATE_DATA(state, payload) {
    state.status = 'success';
    state.user = payload;
    state.isAuthenticated = true;
    state.isFirstLoginComplete = payload.isFirstLoginComplete;
  },
};

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService
        .request('LOGIN', user)
        .then(response => {
          commit('AUTH_LOGIN', response.user);
          AuthService.setAuthToken(response.token);

          return resolve(response);
        })
        .catch(error => {
          commit('AUTH_ERROR');
          if (AuthService.getAuthToken()) AuthService.removeAuthToken();

          return reject(error);
        })
    })
  },

  logout({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService.request('LOGOUT', user)
        .then(response => {
          commit('AUTH_LOGOUT');
          AuthService.removeAuthToken();

          return resolve(response);
        })
        .catch(error => {
          commit('AUTH_LOGOUT');
          commit('AUTH_ERROR');
          AuthService.removeAuthToken();

          return reject(error);
        })
    })
  },

  registerInit({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService.request('REGISTER', user)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  registerConfirm({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService.request('REGISTER_COMPLETE', user)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  secretResetInit({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService.request('PASS_RESET', user)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  secretResetConfirm({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService.request('PASS_CONFIRM', user)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  jwtVerification({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');

      AuthService.request('TOKEN_VERIFY', user)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
};

const getters = {
  getUser: state => state.user,
  isLoggedIn: state => state.isAuthenticated,
  isFirstLoginComplete: state => state.isFirstLoginComplete
};

export default  {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
