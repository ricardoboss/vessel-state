import Vue from 'vue'
import Vuex from 'vuex'
import VesselState, {initial as state} from './state'
import getters, {VesselStateGetters} from './getters'
import mutations from './mutations'
import actions, {VesselStateActions} from './actions'

Vue.use(Vuex)

export { VesselState, VesselStateGetters, VesselStateActions }

export default new Vuex.Store<VesselState>({
	strict: true,
	actions,
	getters,
	mutations,
	state,
})
