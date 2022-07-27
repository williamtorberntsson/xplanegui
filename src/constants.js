// Settings

import PFD from "./components/widgets/pfd/PFD";

/** 
 * Whether to use data fetched from XPlane.
 * @constant
 * @type {boolean}
 * @default
*/
export const USE_XPLANE_DATA = true;

/** 
 * Same number as nr of airplanes in XPlane
 * @constant
 * @type {number}
 * @default
*/
export const NR_AI_PLANES = 7;

/**
 * Key configuration for navigating the WAD with throttle controls
 */
export const KEY_NAVIGATION_CONFIG = {
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    P: 80,
    M: 77,
    ONE: 49,
    TWO: 50
}

export const WIDGET_ORDER = ["reset_left", "pfd", "weights", "warnings", "none", "reset_right"]

/** 
 * Zoom level for map
 * @constant
 * @type {number}
 * @default
*/
export const MAP_ZOOM = 8;

/**
 * Example location and heading init data
 * @constant
 * @type {object}
 * @default
 */
export const POSITION_INIT_DATA = {
    "longitude": 15.680926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0
}

/**
 * PFD example init data
 * @constant
 * @type {object}
 * @default
 */
export const PFD_INIT_DATA = {
    "groundspeed": 0,
    "true_airspeed": 0,
    "true_heading": 0,
    "altitude": 0,
    "pitch": 0,
    "roll": 0,
    "alpha": 0
}

/**
 * Airplane wheights example init data
 * @constant
 * @type {object}
 * @default
 */
export const WEIGHTS_INIT_DATA = {
    "fuel1": 0,
    "fuel2": 0,
    "total_fuel": 0,
    "payload": 0,
    "total": 0
}

/**
 * Airplane init data for offline data use
 * @constant
 * @type {object}
 * @default
 */
export const PLANES_INIT_DATA = [{
    "longitude": 15.880926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0,
    "team_status": 0
},
{
    "longitude": 15.380926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0,
    "team_status": 1
},]

export const VIEW_MODE_LANDING = {
    widgets: {
        UL: null,
        ML: "pfd",
        BL: null,
        UR: "warnings",
        MR: null,
        BR: "weights"
    },
    sizes: {
        UL: 'L',
        BL: 'L',
        UR: 'S',
        BR: 'M',
    }
}

export const VIEW_MODE_MINI = {
    widgets: {
        UL: "pfd",
        ML: null,
        BL: null,
        UR: "warnings",
        MR: null,
        BR: null
    },
    sizes: {
        UL: 'S',
        BL: null,
        UR: 'S',
        BR: null,
    }
}

