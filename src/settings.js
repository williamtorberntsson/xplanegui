// Settings file

/** 
 * Frequency of updating data
 * @constant
 * @category settings
 * @type {number}
 * @default
*/
export const DATA_FREQUENCY = 15;

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
export const NR_AI_PLANES = 3; // Same number as in XPlane (0-19), when not using XPlane any number works

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

