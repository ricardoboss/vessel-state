import {ActionContext, ActionTree, CommitOptions, Store} from "vuex";
import VesselState from "./state";
import {VesselStateMutations} from "./mutations";
import {Decoder, GGA, GSA, GSV, HDT, ITalkerSentence, ITalkerSentenceConstructor, ROT, VTG} from "extended-nmea";

type MutationKey = keyof VesselStateMutations;
export type VesselStateActionContext<R> = Omit<ActionContext<VesselState, R>, "commit"> & {
	commit: <K extends MutationKey>(type: K, payload?: Parameters<VesselStateMutations[K]>[1], options?: CommitOptions) => void;
};

type VesselStateActionHandler<R> = (this: Store<R>, context: VesselStateActionContext<R>, payload?: any) => any;
interface VesselStateActionObject<R> {
	root?: boolean;
	handler: VesselStateActionHandler<R>;
}
type VesselStateAction<R> = VesselStateActionHandler<R> | VesselStateActionObject<R>;

export interface VesselStateActions<R> extends ActionTree<VesselState, R> {
	[key: string]: VesselStateAction<R>;

	register(context: VesselStateActionContext<R>, payload: {id: string, decoder: ITalkerSentenceConstructor}): any;
	update(context: VesselStateActionContext<R>, payload: string): any;
}

export type CustomVesselStateMutation<R, S extends ITalkerSentence = ITalkerSentence> = (context: VesselStateActionContext<R>, sentence: S) => void;

export interface CustomVesselStateMutationRegistrar<R, S extends ITalkerSentence> {
	id: string,
	decoder: ITalkerSentenceConstructor,
	mutator: CustomVesselStateMutation<R, S>;
}

export class CustomVesselStateMutations {
	[key: string]: CustomVesselStateMutation<any>;
}

export default {
	register<S extends ITalkerSentence = ITalkerSentence>(_: VesselStateActionContext<any>, payload: CustomVesselStateMutationRegistrar<any, S>): any {
		if (!payload.id)
			throw new Error("No custom sentence id given!");

		if (!payload.decoder)
			throw new Error("No decoder class given!");

		if (!payload.mutator)
			throw new Error("No mutator function given!");

		Decoder.register(payload.id, payload.decoder);

		CustomVesselStateMutations[payload.id] = payload.mutator;
	},

	update(context: VesselStateActionContext<any>, payload: string): any {
		try {
			const sentence = Decoder.decodeTalker(payload);
			const valid = sentence.valid;
			if (!valid) {
				context.commit("countInvalid");

				return;
			}

			const id = sentence.sentenceId;
			switch (id) {
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
				case GSA.ID:
					context.commit("verticalDilutionOfPrecision", (sentence as GSA).verticalDop);
					context.commit("horizontalDilutionOfPrecision", (sentence as GSA).horizontalDop);
					context.commit("positionalDilutionOfPrecision", (sentence as GSA).positionalDop);
					break;
				default:
					if (typeof CustomVesselStateMutations[id] === 'undefined')
						break;

					//debugger;

					try {
						CustomVesselStateMutations[id](context, sentence);
					} catch (e) {
						console.warn('Error in custom vessel state mutation: ' + e);
					}
					break;
			}

			context.commit("countMessage");
		} catch (e) {
			context.commit("countError");
		}
	}
} as VesselStateActions<any>;
