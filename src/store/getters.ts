import {Getter, GetterTree} from "vuex";
import VesselState from "@/store/state";

export class VesselStateGetters implements GetterTree<VesselState, any> {
	[key: string]: Getter<VesselState, any>;

	// aGetter(state: VesselState, getters: any, rootState: any, rootGetters: any): any {
	//
	// }
}

export default new VesselStateGetters();
