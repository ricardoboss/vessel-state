import Vue from 'vue'
import Vuex, {Module} from 'vuex'
import VesselState, {initial as state} from './state'
import VesselStateGetters from './getters'
import VesselStateMutations from './mutations'
import VesselStateActions from './actions'

Vue.use(Vuex)

export { VesselState, VesselStateGetters, VesselStateActions }

export class VesselStateModule<R> implements Module<VesselState, R> {
	namespaced = true;
	actions = new VesselStateActions<R>();
	getters = new VesselStateGetters<R>();
	mutations = new VesselStateMutations();
	state = state;
}
