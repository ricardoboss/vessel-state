import {Mutation, MutationTree} from "vuex";
import VesselState from "./state";
import {DateOnly, GeoCoordinate, GgaQualityIndicator, GsvSatellite, TimeOnly} from "extended-nmea";

interface CustomMutationPayload {
	path: string;
	value: any;
}

function assign<T extends object>(obj: T, path: string, value: any): void {
	const segments = path.split(".");

	if (segments.length > 1) {
		const front = segments.shift()!;
		assign(obj[front] = Object.prototype.toString.call(obj[front]) === "[object Object]" ? obj[front] : {}, path, value);
	} else obj[path[0]] = value;
}

export interface VesselStateMutations extends MutationTree<VesselState> {
	[key: string]: Mutation<VesselState>;

	latitude(state: VesselState, payload: GeoCoordinate): any;

	longitude(state: VesselState, payload: GeoCoordinate): any;

	altitude(state: VesselState, payload: number): any;

	geoidalSeparation(state: VesselState, payload: number): any;

	roll(state: VesselState, payload: number): any;

	pitch(state: VesselState, payload: number): any;

	heading(state: VesselState, payload: number): any;

	speed(state: VesselState, payload: number): any;

	course(state: VesselState, payload: number): any;

	rateOfTurn(state: VesselState, payload: number): any;

	magneticTrackAngle(state: VesselState, payload: number): any;

	fix(state: VesselState, payload: GgaQualityIndicator): any;

	positionalDilutionOfPrecision(state: VesselState, payload: number): any;

	horizontalDilutionOfPrecision(state: VesselState, payload: number): any;

	verticalDilutionOfPrecision(state: VesselState, payload: number): any;

	satellites(state: VesselState, payload: {
		type: string, satellites: GsvSatellite[]
	}): any;

	time(state: VesselState, payload: TimeOnly): any;

	date(state: VesselState, payload: DateOnly): any;

	manufacturerName(state: VesselState, payload: string): any;

	percent(state: VesselState, payload: number): any;

	voltage(state: VesselState, payload: number): any;

	countMessage(state: VesselState): any;

	countInvalid(state: VesselState): any;

	countError(state: VesselState): any;

	custom(state: VesselState, payload: CustomMutationPayload): any;
}

export default {
	latitude(state: VesselState, payload: GeoCoordinate): any {
		state.location.latitude = payload;
		state.stats.lastUpdate = Date.now();
	},

	longitude(state: VesselState, payload: GeoCoordinate): any {
		state.location.longitude = payload;
		state.stats.lastUpdate = Date.now();
	},

	altitude(state: VesselState, payload: number): any {
		state.location.altitude = payload;
		state.stats.lastUpdate = Date.now();
	},

	geoidalSeparation(state: VesselState, payload: number): any {
		state.location.geoidalSeparation = payload;
		state.stats.lastUpdate = Date.now();
	},

	roll(state: VesselState, payload: number): any {
		state.orientation.roll = payload;
		state.stats.lastUpdate = Date.now();
	},

	pitch(state: VesselState, payload: number): any {
		state.orientation.pitch = payload;
		state.stats.lastUpdate = Date.now();
	},

	heading(state: VesselState, payload: number): any {
		state.orientation.heading = payload;
		state.stats.lastUpdate = Date.now();
	},

	speed(state: VesselState, payload: number): any {
		state.route.speed = payload;
		state.stats.lastUpdate = Date.now();
	},

	course(state: VesselState, payload: number): any {
		state.route.course = payload;
	},

	rateOfTurn(state: VesselState, payload: number): any {
		state.route.rateOfTurn = payload;
		state.stats.lastUpdate = Date.now();
	},

	magneticTrackAngle(state: VesselState, payload: number): any {
		state.route.magneticTrackAngle = payload;
		state.stats.lastUpdate = Date.now();
	},

	fix(state: VesselState, payload: GgaQualityIndicator): any {
		state.gps.fix = payload;
		state.stats.lastUpdate = Date.now();
	},

	positionalDilutionOfPrecision(state: VesselState, payload: number): any {
		state.gps.dilutionOfPrecision.position = payload;
		state.stats.lastUpdate = Date.now();
	},

	horizontalDilutionOfPrecision(state: VesselState, payload: number): any {
		state.gps.dilutionOfPrecision.horizontal = payload;
		state.stats.lastUpdate = Date.now();
	},

	verticalDilutionOfPrecision(state: VesselState, payload: number): any {
		state.gps.dilutionOfPrecision.vertical = payload;
		state.stats.lastUpdate = Date.now();
	},

	satellites(state: VesselState, payload: { type: string, satellites: GsvSatellite[] }): any {
		state.gps.satellites[payload.type] = payload.satellites;
		state.stats.lastUpdate = Date.now();
	},

	time(state: VesselState, payload: TimeOnly): any {
		state.gps.time = payload;
		state.stats.lastUpdate = Date.now();
	},

	date(state: VesselState, payload: DateOnly): any {
		state.gps.date = payload;
		state.stats.lastUpdate = Date.now();
	},

	manufacturerName(state: VesselState, payload: string): any {
		state.source.manufacturer.name = payload;
		state.stats.lastUpdate = Date.now();
	},

	percent(state: VesselState, payload: number): any {
		state.source.battery.percent = payload;
		state.stats.lastUpdate = Date.now();
	},

	voltage(state: VesselState, payload: number): any {
		state.source.battery.voltage = payload;
		state.stats.lastUpdate = Date.now();
	},

	countMessage(state: VesselState): any {
		state.stats.messages.count++;
	},

	countInvalid(state: VesselState): any {
		state.stats.messages.count++;
		state.stats.messages.invalid++;
	},

	countError(state: VesselState): any {
		state.stats.messages.count++;
		state.stats.messages.errors++;
	},

	custom(state: VesselState, payload: CustomMutationPayload): any {
		assign(state, payload.path, payload.value);
	}
} as VesselStateMutations;
