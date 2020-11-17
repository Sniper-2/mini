import Myaxios from './axios.js';

import store from '../store/index';

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
			return response.data;
		},
		function (error) {
			let response = arguments[0].response;
			if (response.data.statu == '-1' && response.data.msgText == '请先进行登录') {
				location.href = '/login';
			}
			store.commit('GET_DATA_LOADING', false);
			return Promise.reject(error);
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
