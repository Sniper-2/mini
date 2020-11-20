const path = require('path');
const EVN =
	process.env.BABEL_ENV == 'production' ? 'http://jy.zjnan.cn' : 'http://localhost:3000';

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
				target: 'http://jy.zjnan.cn',
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
			.set('@', resolve('src')) 
			.set('_c', resolve('src/components'));
	}
};
