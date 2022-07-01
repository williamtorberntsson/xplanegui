
const UpdateOfflineData = (data, updateData) => {
  // simple example
  if (data) {
    updateData({
      ...data,
      longitude: data.longitude + 0.0001,
      latitude: data.latitude + 0.0001,
      heading: data.heading + 0.1
    })

  } else { // no data
    updateData({
      "longitude": 15.680926012604708,
      "latitude": 58.41157469382408,
      "heading": 0
    })
  }
}

export default UpdateOfflineData;
