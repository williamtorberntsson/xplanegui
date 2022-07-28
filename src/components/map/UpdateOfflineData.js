import { POSITION_INIT_DATA, PFD_INIT_DATA, PLANES_INIT_DATA } from "../../settings";

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
    updateData({
      ...data,
      0:{longitude: data[0].longitude + 0.0001, latitude: data[0].latitude + 0.0001, true_heading: (data[0].true_heading + 0.01) % 360, team_status: 0},
      1:{longitude: data[1].longitude - 0.0001, latitude: data[1].latitude + 0.0001, true_heading: (data[1].true_heading + 0.1) % 360, team_status: 1},
      longitude: data.longitude + 0.0001,
      latitude: data.latitude + 0.0001,
      groundspeed: data.groundspeed + 1,
      true_airspeed: (data.true_airspeed + 0.1) % 463,
      true_heading: (data.true_heading + 0.01) % 360,
      altitude: data.altitude + 1,
      pitch: (data.pitch + 0.1) % 90,
      roll: data.roll,
      alpha: data.alpha,
    })

  } else { // no data
    updateData(Object.assign({}, POSITION_INIT_DATA, PFD_INIT_DATA, PLANES_INIT_DATA)) // merge two dict
  }
}

export default UpdateOfflineData;
