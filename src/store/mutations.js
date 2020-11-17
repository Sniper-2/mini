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
	[types.SELECT_MENU_INFO] (state, object) {
		state.selectMenuInfo = object;
	},
	[types.PAGE_BUTTON_LIST] (state, array) {
		state.pageButtonList = array;
	}
};
