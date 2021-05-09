// noinspection JSUnusedGlobalSymbols

import Vue from 'vue';
import {Store} from 'vuex';
import {VesselState} from '@/store';

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $vessel: Store<VesselState>
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vessel?: Store<VesselState>
  }
}
