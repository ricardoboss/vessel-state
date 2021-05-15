import {DateOnly, GeoCoordinate, GgaQualityIndicator, GsvSatellite, TimeOnly} from "extended-nmea";

export default interface VesselState {
	location: {
		latitude: GeoCoordinate,
		longitude: GeoCoordinate,
		altitude: number,
		geoidalSeparation: number,
	},
	orientation: {
		roll: number,
		pitch: number,
		heading: number,
	},
	route: {
		speed: number,
		course: number,
		rateOfTurn: number,
		magneticTrackAngle: number,
	},
	gps: {
		fix?: GgaQualityIndicator,
		dilutionOfPrecision: {
			position: number,
			horizontal: number,
			vertical: number,
		},
		satellites: {
			[keyof: string]: GsvSatellite[]
		},
		time: TimeOnly,
		date: DateOnly,
	},
	source: {
		manufacturer: {
			name: string,
		},
		battery: {
			percent: number,
			voltage: number,
		},
	},
	stats: {
		lastUpdate: number,
		messages: {
			count: number,
			invalid: number,
			errors: number
		},
	},
}

export const initial = {
	location: {
		latitude: new GeoCoordinate('000.000', 'N'),
		longitude: new GeoCoordinate('000.000', 'E'),
		altitude: 0,
		geoidalSeparation: 0,
	},
	gps: {
		dilutionOfPrecision: {
			position: 0,
			vertical: 0,
			horizontal: 0,
		},
		satellites: {},
		time: new TimeOnly(0),
		date: new DateOnly(0, 0, 0),
		fix: GgaQualityIndicator.No_Fix,
	},
	orientation: {
		heading: 0,
		pitch: 0,
		roll: 0,
	},
	route: {
		rateOfTurn: 0,
		course: 0,
		speed: 0,
		magneticTrackAngle: 0,
	},
	source: {
		manufacturer: {
			name: '',
		},
		battery: {
			voltage: 0,
			percent: 0,
		},
	},
	stats: {
		lastUpdate: 0,
		messages: {
			count: 0,
			invalid: 0,
			errors: 0,
		},
	},
} as VesselState;
