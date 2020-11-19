import * as types from './types';

export default {
	[types.GET_DATA_LOADING] (state, loading) {
		state.getDataLoading = loading;
	},
	[types.ROUTE_INFO] (state, object) {
		state.routeInfo = object;
	},
	[types.MENU_SHOW_TYPE] (state, string) {
		state.menuShowType = string;
	},
	[types.USER_INFO] (state, object) {
		state.userInfo = object;
	}
};
