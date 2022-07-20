// Settings

/** 
 * Whether to use data fetched from XPlane.
 * @constant
 * @type {boolean}
 * @default true
*/
export const useXplaneData = false;

/** 
 * Same number as nr of airplanes in XPlane
 * @constant
 * @type {number}
 * @default 5
*/
export const nrAiPlanes = 2;

/** 
 * Zoom level for map
 * @constant
 * @type {number}
 * @default 8
*/
export const mapZoom = 8;

// Location and airplane data
export const position_init_data = {
    "longitude": 15.680926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0
}
export const pfd_init_data = {
    "groundspeed": 0,
    "true_airspeed": 0,
    "true_heading": 0,
    "altitude": 0,
    "pitch": 0,
    "roll": 0,
    "alpha": 0
}
export const weights_init_data = {
    "fuel1": 0,
    "fuel2": 0,
    "total_fuel": 0,
    "payload": 0,
    "total": 0
}

export const planes_init_data = [{
    "longitude": 15.880926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0
},
{
    "longitude": 15.380926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0
},]

