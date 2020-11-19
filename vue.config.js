const path = require('path');
// const publicPath = process.env.BABEL_ENV == 'production' ? '/' : '/pythonSystem';
// ? 'http://39.108.56.167:8099'
const EVN =
	process.env.BABEL_ENV == 'production' ? 'http://39.108.56.167:8099' : 'http://localhost:3000';

const resolve = dir => {
	return path.join(__dirname, dir);
};
module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	publicPath: '/',
	lintOnSave: true,
	devServer: {
		port: 3000,
		proxy: {
			'/inspection': {
				target: 'http://1v85r80243.51mypc.cn',
				// target: 'http://api.aqmcn.com',
				// target: 'http://192.168.99.116:8060',
				changeOrigin: true
			}
		}
	},
	configureWebpack: {
		entry: './src/main.js'
	},
	chainWebpack: config => {
		config.plugin('define').tap(args => {
			args[0]['process.env'] = {
				...args[0]['process.env'],
				API_URL: JSON.stringify(EVN)
			};
			return args;
		});
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('_c', resolve('src/components'));
		console.log('-----------------------------');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('开发前请先阅读README');
		console.log('-----------------------------');
	}
};
