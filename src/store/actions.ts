import {Action, ActionTree} from "vuex";
import VesselState from "@/store/state";

export class VesselStateActions implements ActionTree<VesselState, VesselState> {
	[key: string]: Action<VesselState, VesselState>;

	// anAction(injectee: ActionContext<VesselState, VesselState>, payload?: any): any {
	//
	// }
}

export default new VesselStateActions();
