// noinspection JSUnusedGlobalSymbols

import Vue from 'vue';
import {Store} from 'vuex';
import {VesselState} from './module';

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: Store<any & {vessel: VesselState}>;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $store: Store<any & { vessel: VesselState }>;
  }
}
