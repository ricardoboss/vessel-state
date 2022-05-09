import {Module} from 'vuex'
import VesselState, {initial} from './state'
import {VesselStateGetters, default as getters} from './getters'
import {VesselStateMutations, default as mutations} from './mutations'
import {
	VesselStateActions,
	CustomVesselStateMutation,
	CustomVesselStateMutationRegistrar,
	CustomVesselStateMutations,
	VesselStateActionContext,
	default as actions,
} from './actions'

export {
	VesselState,
	VesselStateGetters,
	VesselStateActions,
	CustomVesselStateMutation,
	CustomVesselStateMutationRegistrar,
	CustomVesselStateMutations,
	VesselStateActionContext
}

export interface VesselStateModuleOptions {
	namespace?: string;
	initialState?: Partial<VesselState>;
}

export class VesselStateModule<R> implements Module<VesselState, R> {
	namespaced = true;
	actions: VesselStateActions<R>;
	getters: VesselStateGetters<R>;
	mutations: VesselStateMutations;
	state: VesselState;

	constructor(options: VesselStateModuleOptions = {}) {
		this.actions = actions;
		this.getters = getters;
		this.mutations = mutations;
		this.state = initial;

		if (options.initialState) Object.assign(this.state, options.initialState);
	}
}
