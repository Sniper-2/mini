import Vue from 'vue';
import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
	return originalPush.call(this, location).catch(err => err);
};
let routes = [{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/login')
	},
	{
		path: '/systemIndex',
		name: 'system-page',
		component: () => import('@/pages/system-page'),
		children: [
			{
				meta: {
					title: '图片设置'
				},
				name: 'miniAppImgSet',
				path: '/miniAppImgSet'
			},
			{
				meta: {
					title: '预约列表'
				},
				name: 'reservationsList',
				path: '/reservationsList'
			},
			{
				meta: {
					title: '修改密码'
				},
				name: 'changePassword',
				path: '/changePassword'
			},
			{
				meta: {
					title: '联系方式'
				},
				name: 'contactMode',
				path: '/contactMode'
			},
		]
	},
	{
		path: '/404',
		component: () => import('@/pages/error/404')
	},
	{
		path: '',
		// redirect: '/login'
		redirect: '/systemIndex'
	},
	{
		path: '*',
		redirect: '/404'
	}
];

Vue.use(VueRouter);

autoImport(routes);
export function createRouter () {
	return new VueRouter({
		routes,
		base: '/',
		mode: 'history'
	});
}

function autoImport (routes, prefix = '', level = 0) {
	for (let route of routes) {
		if (!route.component && route.name) {
			if (prefix) {
				route.component = () => import(`@/pages/${prefix}/${route.name}`);
			} else {
				route.component = () => import(`@/pages/${route.name}`);
			}
		}
		if (route.children) {
			autoImport(route.children, route.name, level + 1);
		}
	}
	return routes;
}
