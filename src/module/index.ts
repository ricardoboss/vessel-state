import {Module} from 'vuex'
import VesselState, {initial} from './state'
import {VesselStateGetters, default as getters} from './getters'
import {VesselStateMutations, default as mutations} from './mutations'
import {VesselStateActions, default as actions} from './actions'

export { VesselState, VesselStateGetters, VesselStateActions }

export class VesselStateModule<R> implements Module<VesselState, R> {
	namespaced = true;
	actions: VesselStateActions<R>;
	getters: VesselStateGetters<R>;
	mutations: VesselStateMutations;
	state: VesselState;

	constructor() {
		this.actions = actions;
		this.getters = getters;
		this.mutations = mutations;
		this.state = initial;
	}
}
