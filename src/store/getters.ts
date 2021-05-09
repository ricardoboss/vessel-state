import {Getter, GetterTree} from "vuex";
import VesselState from "@/store/state";

export class VesselStateGetters implements GetterTree<VesselState, VesselState> {
	[key: string]: Getter<VesselState, VesselState>;

	// aGetter(state: VesselState, getters: any, rootState: VesselState, rootGetters: any): any {
	//
	// }
}

export default new VesselStateGetters();
