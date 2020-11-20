import Myaxios from './axios.js';

import store from '../store/index';
import { Message } from 'element-ui';
import { createRouter } from '@/route';
let Router = createRouter()

/**
 * @param prefix url前缀
 */
// const requestPrefix = process.env.API_URL;
export default function (prefix = '', config = {}) {
	if (prefix) config['baseURL'] = prefix;
	const instances = Myaxios(config);

	if (config['loading']) {
		store.commit('GET_DATA_LOADING', true);
	}

	// 请求拦截器
	instances.interceptors.request.use(
		config => {
			if (config.method === 'get' && !config.params && config.data) {
				config.params = config.data;
			}
			if (config.method === 'get') {
				config.data = true;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	// 添加响应拦截器
	instances.interceptors.response.use(
		function (response) {
			store.commit('GET_DATA_LOADING', false);
			if (response.data.code == 500) {
				return Promise.reject(response.data);
			}
			if (response.data.code == 401) {
				setTimeout(() => {
					// console.log(Vue.$router)
					// Router.push({ name: 'login' })
					location.href = '/login';
				}, 800)
				return Promise.reject(response.data);
			}
			return response.data;
		},
		function (error) {
			let data = arguments[0].response.data;
			store.commit('GET_DATA_LOADING', false);
			return Promise.reject(data);
		}
	);

	return {
		get: (url, params, config = {}) => {
			config.params = params;
			return instances.get(url, config);
		},
		head: instances.head,
		post: instances.post,
		put: instances.put,
		patch: instances.patch
	};
}
