# vessel-state
### Takes a stream of data and decodes it into a reactive state for use in Vue components.

This library uses [ricardoboss/extended-nmea][2] to decode NMEA0183 sentences.
The decoded sentences get used to update the library state.
You can use this library in your Vue.js project to reactively bind to specific values.

---

## API

```vue
<template>
    <span>ROT: {{ val }}</span>
</template>

<script>
import VesselState from 'vessel-state';

export default {
    name: 'DisplayROT',
    
    computed: {
    	val() {
    		return VesselState.Sentence.NMEA0183.ROT.current;
      }
    }
}
</script>

```

---

## License

This project is licensed under the MIT license. Please review the [LICENSE file][1] for more information.

[1]: https://github.com/ricardoboss/vessel-state/blob/develop/LICENSE
[2]: https://github.com/ricardoboss/extended-nmea
