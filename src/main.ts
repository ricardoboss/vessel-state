import {VesselState, VesselStateActions, VesselStateGetters, VesselStateModule} from "./module"
import {Store} from "vuex";

export {VesselStateModule, VesselState, VesselStateActions, VesselStateGetters }

// noinspection JSUnusedGlobalSymbols
export function createPlugin<R = any>() {
	return function(store: Store<R>) {
		const module = new VesselStateModule<R>();

		store.registerModule('vessel', module);
	}
}
