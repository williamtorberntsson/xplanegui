import { position_init_data, pfd_init_data, planes_init_data } from "../../constants";

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
    updateData(Object.assign({}, position_init_data, pfd_init_data, planes_init_data)) // merge two dict
  }
}

export default UpdateOfflineData;
