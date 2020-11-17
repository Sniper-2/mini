import * as types from './types';

export default {
	[types.GET_DATA_LOADING] ({
		commit
	}, loading) {
		commit(types.GET_DATA_LOADING, loading);
	},
	[types.ROUTE_INFO] ({
		commit
	}, object) {
		commit(types.ROUTE_INFO, object);
	},
	[types.MENU_SHOW_TYPE] ({
		commit
	}, string) {
		commit(types.MENU_SHOW_TYPE, string);
	},
	[types.SELECT_MENU_INFO] ({
		commit
	}, object) {
		commit(types.SELECT_MENU_INFO, object);
	},
	[types.PAGE_BUTTON_LIST] ({
		commit
	}, array) {
		commit(types.PAGE_BUTTON_LIST, array);
	}
};
