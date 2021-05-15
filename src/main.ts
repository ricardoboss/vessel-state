import {VesselState, VesselStateActions, VesselStateGetters, VesselStateModule} from "./module"
import {Store} from "vuex";

export {VesselStateModule, VesselState, VesselStateActions, VesselStateGetters }

// noinspection JSUnusedGlobalSymbols
export function createPlugin(options: any = {}) {
	return function<R = any>(store: Store<R>) {
		const namespace = options.namespace || 'vessel';

		store.registerModule(namespace, new VesselStateModule<R>(), options);
	}
}
