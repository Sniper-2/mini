/*
 * @Author: LiRunLiang
 * @Date: 2019-07-04 17:38:26
 * @Last Modified by: LiRunLiang
 * @Last Modified time: 2019-07-04 17:55:57
 */

import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
	mutations,
	strict: true
});
