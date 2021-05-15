import {Getter, GetterTree} from "vuex";
import VesselState from ".//state";

export default class VesselStateGetters<R> implements GetterTree<VesselState, R> {
	[key: string]: Getter<VesselState, R>;

	// aGetter(state: VesselState, getters: any, rootState: any, rootGetters: any): any {
	//
	// }
}
