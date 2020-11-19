import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { sync } from 'vuex-router-sync';
import { createRouter } from '@/route';
import store from '@/store/index.js';
import '@/static/style/reset.scss';
import CommonMethods from '@/utils/CommonMethods';
import DateMethods from '@/utils/DateMethods';
import request from '@/utils/request'
import apiConfig from '@/utils/api-config'
import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(ElementUI);
Vue.use(DateMethods);
Vue.use(CommonMethods);
Vue.use(VueQuillEditor);
;
Vue.prototype.request = request
Vue.prototype.apiConfig = apiConfig

const router = createRouter()
router.beforeEach((to, from, next) => {
	store.commit('ROUTE_INFO', to.meta);
	document.title = to.meta.title || '松炉设备检测后台管理系统' ;
	next();
});
sync(store, router);
// eslint-disable-next-line no-unused-vars
let app = new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
