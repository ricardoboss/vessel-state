import {Mutation, MutationTree} from "vuex";
import VesselState from "@/store/state";

export class VesselStateMutations implements MutationTree<VesselState> {
	[key: string]: Mutation<VesselState>;

	// aMutation(state: VesselState, payload?: any): any {
	//
	// }
}

export default new VesselStateMutations();
