import {
	CustomVesselStateMutation,
	CustomVesselStateMutations,
	CustomVesselStateMutationRegistrar,
	VesselState,
	VesselStateActionContext,
	VesselStateActions,
	VesselStateGetters,
	VesselStateModule,
	VesselStateModuleOptions
} from "./module"
import {Store} from "vuex";

export {
	CustomVesselStateMutation,
	CustomVesselStateMutationRegistrar,
	CustomVesselStateMutations,
	VesselState,
	VesselStateActionContext,
	VesselStateActions,
	VesselStateModule,
	VesselStateGetters,
	VesselStateModuleOptions
}

// noinspection JSUnusedGlobalSymbols
export function createPlugin<R = any>(options: VesselStateModuleOptions = {}) {
	return function (store: Store<R>) {
		const namespace = options.namespace || 'vessel';
		const module = new VesselStateModule<R>();

		store.registerModule(namespace, module);
	}
}
