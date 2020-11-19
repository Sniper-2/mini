import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.API_URL;
let defaultsHeader = 'application/json';
let fromDataType = 'application/x-www-form-urlencoded;charset=UTF-8';
let multipartType = 'multipart/form-data';
let token = localStorage.getItem('token')
function serialize (obj) {
	if (!obj) return '';
	let arr = [];
	let keys = Object.keys(obj);
	if (!keys.length) {
		return '';
	}
	keys.forEach(item => {
		arr.push(`${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`);
	});
	return `${arr.join('&')}`;
}
export default function (config = { timeout: 5000 }) {
	config = {
		headers: { 
			'Content-Type': config['ContentType'] || fromDataType,
			AdminToken: token
		},
		transformRequest: [
			function (params, headers) {
				if (headers['Content-Type'] == fromDataType) {
					return serialize(params);
				}
				if (headers['Content-Type'] == multipartType) return params;
				return JSON.stringify(params);
			}
		],
		paramsSerializer: function (params) {
			return serialize(params);
		},
		...config
	};
	return axios.create(config);
}
