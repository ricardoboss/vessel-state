import {VesselState, VesselStateActions, VesselStateGetters} from './store'
import _Vue from 'vue';
import VesselStatePlugin from './VesselStatePlugin';

export { VesselState, VesselStateActions, VesselStateGetters }

// noinspection JSUnusedGlobalSymbols
export default {
	install(Vue: typeof _Vue): void {
		new VesselStatePlugin(Vue);
	}
}
