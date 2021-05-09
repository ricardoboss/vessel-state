import {DateOnly, GeoCoordinate, GgaQualityIndicator, GsvSatellite, TimeOnly} from "extended-nmea";

export default interface VesselState {
	location?: {
		latitude?: GeoCoordinate,
		longitude?: GeoCoordinate,
		altitude?: number,
		geoidalSeparation?: number,
	},
	orientation?: {
		roll?: number,
		pitch?: number,
		heading?: number,
	},
	route?: {
		speed?: number,
		course?: number,
		rateOfTurn?: number,
		magneticTrackAngle?: number,
	},
	gps?: {
		fix?: GgaQualityIndicator,
		dilutionOfPrecision?: {
			position: number,
			horizontal: number,
			vertical: number,
		},
		satellites?: {
			[keyof: string]: GsvSatellite[]
		},
		time?: TimeOnly,
		date?: DateOnly,
	},
	source?: {
		manufacturer?: {
			name?: string,
		},
		battery?: {
			percent?: number,
			voltage?: number,
		},
	},
	stats: {
		lastUpdate?: Date,
		messages: {
			count: number,
			invalid: number,
			errors: number
		},
	},
}
