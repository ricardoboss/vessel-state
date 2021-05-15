import {default as VesselStateStore} from './store';
import _Vue from 'vue';

export default class VesselStatePlugin {
	constructor(Vue: typeof _Vue) {
		// noinspection JSUnusedGlobalSymbols
		Vue.prototype.$vessel = VesselStateStore;
	}
}
