import {Action, ActionContext, ActionTree, CommitOptions} from "vuex";
import VesselState from "@/store/state";
import {VesselStateMutations} from "@/store/mutations";
import {Decoder, GGA, GSV, HDT, ROT, VTG} from "extended-nmea";

type MutationKey = keyof VesselStateMutations;
type ctx = Omit<ActionContext<VesselState, VesselState>, "commit"> & {
	commit: <K extends MutationKey>(type: K, payload?: Parameters<VesselStateMutations[K]>[1], options?: CommitOptions) => void;
};

export class VesselStateActions implements ActionTree<VesselState, VesselState> {
	[key: string]: Action<VesselState, VesselState>;

	["update"](context: ctx, payload: string): any {
		try {
			const sentence = Decoder.decodeTalker(payload);
			const valid = sentence.valid;
			if (!valid) {
				context.commit("countInvalid");

				return;
			}

			switch (sentence.sentenceId) {
				case ROT.ID:
					context.commit("rateOfTurn", (sentence as ROT).rateOfTurn);
					break;
				case GGA.ID:
					context.commit("latitude", (sentence as GGA).latitude);
					context.commit("longitude", (sentence as GGA).longitude);
					context.commit("horizontalDilutionOfPrecision", (sentence as GGA).horizontalDOP);
					context.commit("altitude", (sentence as GGA).altMean);
					context.commit("geoidalSeparation", (sentence as GGA).geoidalSeparation);
					context.commit("fix", (sentence as GGA).gpsQuality);
					context.commit("time", (sentence as GGA).time);
					break;
				case VTG.ID:
					context.commit("speed", (sentence as VTG).speedKmh);
					context.commit("course", (sentence as VTG).trackingAngle);
					context.commit("magneticTrackAngle", (sentence as VTG).magneticTrackingAngle);
					break;
				case HDT.ID:
					context.commit("heading", (sentence as HDT).heading);
					break;
				case GSV.ID:
					const satellites = [...(sentence as GSV).satellites()];

					context.commit("satellites", {type: sentence.talkerId, satellites});
					break;
			}

			context.commit("countMessage");
		} catch (e) {
			context.commit("countError");
		}
	}
}

export default new VesselStateActions();
