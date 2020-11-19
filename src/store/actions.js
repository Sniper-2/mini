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
	[types.USER_INFO] ({
		commit
	}, object) {
		commit(types.USER_INFO, object);
	}
};
