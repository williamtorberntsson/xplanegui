/**
 * The haversine formula calculates the great-circle distance between two points –
 * the shortest distance over the earth’s surface.
 * See {@link http://www.movable-type.co.uk/scripts/latlong.html}
 * @function
 * @param {float} lat1 latitude travel from
 * @param {float} lon1 longitude travel from
 * @param {float} lat2 latitude travel to
 * @param {float} lon2 longitude travel to
 * @returns {float} distance to other point in meters
 */
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d.toFixed(0)
}

export default haversine;