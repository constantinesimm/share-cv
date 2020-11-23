import i18n from '@/libs/i18n';
import AppLayout from '@/views/layouts/AppLayout';
import LandingLayout from '@/views/layouts/LandingLayout';
import PublicCvLayout from '@/views/layouts/PublicCvLayout';

import ShardsVue from 'shards-vue';
import ElementUI from 'element-ui';

/**
 * UI Styles
 * Shards UI + Dashboard
 * Element UI
 * Bootstrap
 */
import '../assets/styles/bootstrap.css';
import '../assets/styles/shards/date-range.scss';
import '../assets/styles/shards/shards-dashboards.scss';

import '../assets/styles/element/index.css';
import '../assets/styles/element/display.css';

const uiConnector = Vue => {
    ShardsVue.install(Vue);
    Vue.use(ElementUI);

    Vue.component(AppLayout.name, AppLayout);
    Vue.component(LandingLayout.name, LandingLayout);
    Vue.component(PublicCvLayout.name, PublicCvLayout);
}

export default uiConnector;
