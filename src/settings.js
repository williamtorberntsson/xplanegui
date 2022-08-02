// Settings file

/** 
 * Whether to use data fetched from XPlane.
 * @constant
 * @category settings
 * @type {boolean}
 * @default
*/
export const USE_XPLANE_DATA = true;

/** 
 * Same number as nr of airplanes in XPlane
 * @constant
 * @category settings
 * @type {number}
 * @default
*/
export const NR_AI_PLANES = 3;

/**
 * Key configuration for navigating the WAD with throttle controls
 * @constant
 * @category settings
 */
export const KEY_NAVIGATION_CONFIG = {
    LEFT_ARROW: "ArrowLeft",
    UP_ARROW: "ArrowUp",
    RIGHT_ARROW: "ArrowRight",
    DOWN_ARROW: "ArrowDown",
    p: "p",
    m: "m",
    ONE: "1",
    TWO: "2"
}
/**
 * List for all buttoms at bottom of screen
 * @constant
 * @category settings
 */
export const WIDGET_ORDER = ["reset_left", "pfd", "weights", "warnings", "none", "reset_right"]

/** 
 * Zoom level for map
 * @constant
 * @category settings
 * @type {number}
 * @default
*/
export const MAP_ZOOM = 8;

/**
 * Example location and heading init data
 * @constant
 * @category settings
 * @type {object}
 */
export const POSITION_INIT_DATA = {
    "longitude": 15.680926012604708,
    "latitude": 58.41157469382408,
    "true_heading": 0
}

/**
 * PFD example init data
 * @constant
 * @category settings
 * @type {object}
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
 * @category settings
 * @type {object}
 */
export const WEIGHTS_INIT_DATA = {
    "fuel1": 0,
    "fuel2": 0,
    "total_fuel": 0,
    "payload": 0,
    "total": 0
}


let AI_PLANE_INIT_DATA = []
for (let i = 0; i < NR_AI_PLANES; i++) {
    AI_PLANE_INIT_DATA.push(
        {
            "longitude": 15.88092 + (Math.random() * 2 - 1) * 0.1,
            "latitude": 58.41157469382408 + (Math.random() * 2 - 1) * 0.1,
            "true_heading": Math.random() * 360,
            "team_status": Math.floor(Math.random() * 3)
        }
    )
}
/**
 * Airplane init data for offline data use
 * @constant
 * @category settings
 * @type {object}
 */
export const PLANES_INIT_DATA = AI_PLANE_INIT_DATA;

/**
 * Setting for a example widget configuration when landing
 * @constant
 * @category settings
 */
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

/**
 * Setting for a example widget configuration with minimum widgets
 * @constant
 * @category settings
 */
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

