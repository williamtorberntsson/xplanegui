
const UpdateOfflineData = (data, updateData) => {
  // simple example
  if (data) {
    updateData({
      ...data,
      longitude: data.longitude + 0.0001,
      latitude: data.latitude + 0.0001,
      groundspeed: data.groundspeed + 1,
      true_airspeed: (data.true_airspeed + 0.1) % 463,
      true_heading: (data.true_heading + 0.01) % 360,
      altitude: data.altitude + 1,
      pitch: (data.pitch + 0.1) % 90,
      roll: data.roll,
      alpha: data.alpha,
      planes_data: [{longitude: data.longitude + 0.0003, latitude: data.latitude + 0.0001, true_heading: (data.true_heading + 0.01) % 360}],


    //   nr_of_planes: 5,
    //   planes_data: [0] * nr_of_planes,


    //   for i = range(len(planes_data))
    //   temp = client.getPOSI(i + 1)
    //           planes_data[i] = {
    //     "longitude": temp[1],
    //     "latitude": temp[0],
    //     "true_heading": temp[5]
    //   },
    })

  } else { // no data
    updateData({
      "longitude": 15.680926012604708,
      "latitude": 58.41157469382408,
      "groundspeed": 0,
      "true_airspeed": 0,
      "true_heading": 0,
      "altitude": 0,
      "pitch": 0,
      "roll": 0,
      "alpha": 0,
      "planes": 0,
      "planes_data":[{"longitude": 15.680926012604708,"latitude": 58.41157469382408,"true_heading": 0}]
      })
  }
}

export default UpdateOfflineData;
