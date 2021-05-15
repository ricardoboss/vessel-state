import {default as Vue_} from "vue";
import {VesselState, VesselStateActions, VesselStateGetters, VesselStateModule} from "./module"

export {VesselStateModule, VesselState, VesselStateActions, VesselStateGetters }

// noinspection JSUnusedGlobalSymbols
export default function(Vue: Vue_) {
	Vue.$store.registerModule('vessel', new VesselStateModule<unknown>());
}
