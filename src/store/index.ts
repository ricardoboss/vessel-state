import Vue from 'vue'
import Vuex from 'vuex'
import VesselState, {initial as state} from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store<VesselState>({
	strict: true,
	actions,
	getters,
	mutations,
	state,
})
