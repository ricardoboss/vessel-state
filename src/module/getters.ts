import {Getter, GetterTree} from "vuex";
import VesselState from ".//state";

export interface VesselStateGetters<R> extends GetterTree<VesselState, R> {
	[key: string]: Getter<VesselState, R>;

	// aGetter(state: VesselState, getters: any, rootState: any, rootGetters: any): any;
}

export default {
	// aGetter(state: VesselState, getters: any, rootState: any, rootGetters: any): any {
	//
	// }
} as VesselStateGetters<any>;
