import {Module} from 'vuex'
import VesselState, {initial} from './state'
import {default as getters, VesselStateGetters} from './getters'
import {default as mutations, VesselStateMutations} from './mutations'
import {
	CustomVesselStateMutation,
	CustomVesselStateMutations,
	CustomVesselStateMutationRegistrar,
	default as actions,
	VesselStateActionContext,
	VesselStateActions
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
