import Vue from 'vue'
import Vuex from 'vuex'
import VesselState from './state'

Vue.use(Vuex)

export default new Vuex.Store<VesselState>({
	state: {
		stats: {
			messages: {
				count: 0,
				invalid: 0,
				errors: 0,
			}
		}
	} as VesselState
})
