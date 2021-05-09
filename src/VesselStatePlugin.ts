// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import store from './store'
import _Vue from 'vue';

export function VesselStatePlugin(Vue: typeof _Vue, options?: VesselStateOptions): void {
	Vue.prototype.$vessel = store;
}

export class VesselStateOptions {

}
