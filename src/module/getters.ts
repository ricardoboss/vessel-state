import {GetterTree} from "vuex";
import VesselState from "./state";

type StoreGetters<T extends GetterTree<any, any>> = {[P in keyof T]: ReturnType<T[P]> };
type VesselGetters<R> = StoreGetters<VesselStateGetters<R>>;

// noinspection JSUnusedGlobalSymbols
export default class VesselStateGetters<R> implements GetterTree<VesselState, R> {
	[key: string]: (
		state: VesselState,
		getters: VesselGetters<R>,
		rootState: R,
		rootGetters: StoreGetters<GetterTree<R, R>>
	) => any;

	dateTimestamp(state: VesselState): Date {
		const date = state.gps.date;
		const time = state.gps.time;

		return new Date(
			date.year, date.month - 1, date.day,
			time.hours, time.minutes, time.seconds, time.milliseconds
		);
	}

	unixTimestamp(_state: VesselState, getters: VesselGetters<R>): number {
		return getters.dateTimestamp.getTime();
	}
}
