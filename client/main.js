import Vue from 'vue'
import App from './App.vue'

import i18n from '@/libs/i18n';
import router from '@/router';

import uiConnector from '@/libs/ui-connector';

Vue.prototype.$eventHub = new Vue();
Vue.config.productionTip = process.env.NODE_ENV === 'development';

uiConnector(Vue);

new Vue({
  i18n,
  router: router,
  render: h => h(App),
}).$mount('#app')
