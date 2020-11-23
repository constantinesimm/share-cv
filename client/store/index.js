import Vue from 'vue';
import Vuex from 'vuex';
import Storage from "@/libs/storage";
import createPersistedState from 'vuex-persistedstate';

/**
 * App User modules
 */
import auth from './modules/auth.module';
import user from './modules/user.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, user
  },
  plugins: [
    createPersistedState({
      key: 'share-cv',
      storage: {
        getItem: (key) => Storage.getItem(key),
        setItem: (key, data) => Storage.setItem(key, data),
        removeItem: (key) => Storage.removeItem(key)
      }
    })
  ]
})
