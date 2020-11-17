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

Vue.use(ElementUI);
Vue.use(DateMethods);
Vue.use(CommonMethods);
const router = createRouter();
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
