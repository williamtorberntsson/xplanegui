import { POSITION_INIT_DATA, PFD_INIT_DATA, PLANES_INIT_DATA, NR_AI_PLANES } from "../../settings";

/**
 * A function that updates data by increasing some values.
 * This is an example on updating data, the values/update are not
 * meant to be realistic.
 * @function
 * @param {object} data data to update
 * @param {function} updateData function that sets the data 
 */
const UpdateOfflineData = (data, updateData) => {
  // simple example
  // console.log(data)
  if (data) {
    let newData = {
      ...data,
      // update own airplane
      longitude: data.longitude + 0.0001,
      latitude: data.latitude + 0.0001,
      groundspeed: data.groundspeed + 1,
      true_airspeed: (data.true_airspeed + 0.1) % 463,
      true_heading: (data.true_heading + 0.01) % 360,
      altitude: data.altitude + 1,
      pitch: (data.pitch + 0.1) % 90,
      roll: data.roll,
      alpha: data.alpha,
    }
    // update AI airplanes
    for (let i = 0; i < NR_AI_PLANES; i++) {
      const sign = (-1) ** ((i % 2) + 1); // 1/-1 for odd/even numbers
      newData[i] = {
        longitude: data[i].longitude + sign * Math.random() * 0.001,
        latitude: data[i].latitude + sign * Math.random() * 0.001,
        true_heading: (data[i].true_heading + Math.random()) % 360,
        team_status: PLANES_INIT_DATA[i].team_status
      }
    }
    updateData(newData)

  } else { // no data
    updateData(Object.assign({}, POSITION_INIT_DATA, PFD_INIT_DATA, PLANES_INIT_DATA)) // merge two dict
  }
}

export default UpdateOfflineData;
