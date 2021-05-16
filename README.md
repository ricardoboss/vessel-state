# vessel-state

### Takes a stream of data and decodes it into a reactive Vuex store for use in Vue components.

This library uses [ricardoboss/extended-nmea][2] to decode NMEA0183 sentences. The decoded sentences get used to update
the module state. You can use this library in your Vue.js project to reactively bind to specific values extracted from
an NMEA0183 data stream.

---

## API

1. Register the plugin:

```typescript
// ./src/store/index.ts

import Vue from "vue"
import Vuex from "vuex"
import {createPlugin as createVesselStatePlugin} from "vessel-state";
import {RootState} from "./states/RootState";

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
	plugins: [createVesselStatePlugin<RootState>()],
});
```

2. Bind a value:

```vue
<!-- ./src/views/ROT.vue -->

<template>
	<span>ROT: {{ rateOfTurn }}</span>
</template>

<script>
export default {
	name: "ROT",

	computed: {
		...mapState("vessel", {
			rateOfTurn: state => state.route.rateOfTurn
		})
	}
}
</script>
```

3. Update the value using the `vessel/update` action with the NMEA0183 sentence as the payload:

```typescript
// somewhere in your code...

this.$store.dispatch('vessel/update', "$--ROT,-1.31,A*38"); // will update the value of rateOfTurn to -1.31
```

---

## Custom NMEA sentences

Since [ricardoboss/extended-nmea][2] supports the addition of custom sentences, this library also propagates this
feature to you.

Create your `TalkerSentence` implementation and register it in a `CustomVesselStateMutationRegistrar`:

```typescript
// ./src/sentences/NAV.ts

import {TalkerSentence} from "extended-nmea/dist/types/sentences/TalkerSentence";
import {RawNmeaSentence} from "extended-nmea/dist/types/sentences/RawNmeaSentence";
import {RootState} from "@/store/states/RootState";
import {VesselStateActionContext, CustomVesselStateMutationRegistrar} from "vessel-state";

export class NAV extends TalkerSentence {
	public static readonly ID = "NAV";

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get roll(): number {
		return parseFloat(this.dataFields[0]);
	}

	public get pitch(): number {
		return parseFloat(this.dataFields[1]);
	}
}

export const registrar = {
	id: NAV.ID, decoder: NAV, mutator: (context: VesselStateActionContext<RootState>, sentence: NAV) => {
		context.commit('roll', sentence.roll);
		context.commit('pitch', sentence.pitch);
	}
} as CustomVesselStateMutationRegistrar<RootState, NAV>;
```

Then, in your store, register the registrar via dispatch:

```typescript
import {registrar as NavRegistrar} from "@/sentences/NAV";

const store = new Vuex.Store<...>(...);

store.dispatch('vessel/register', NavRegistrar);

export default store;
```

### Custom state properties

If you need/want to add custom properties to the vessel state, use the `custom` mutation and a `CustomMutationPayload`:

```typescript
// in a registrar mutator...

context.commit('custom', {
  path: 'my.custom.property',
  value: sentence.myCustomValue
});
```

---

## License

This project is licensed under the MIT license. Please review the [LICENSE file][1] for more information.

[1]: https://github.com/ricardoboss/vessel-state/blob/develop/LICENSE
[2]: https://github.com/ricardoboss/extended-nmea
