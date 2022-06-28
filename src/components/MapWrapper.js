// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

function MapWrapper(props) {

  // set intial state
  const [map, setMap] = useState()

  // pull refs
  const mapElement = useRef()

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {

    // create map
    const initialMap = new Map({
      target: 'map',
      layers: [

        // Google Maps Terrain
        new TileLayer({
          source: new XYZ({
            url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
          })
        }),

      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
        rotation: props.rotate
      }),
      controls: []
    })

    // save map and vector layer references to state
    setMap(initialMap)

  }, [])

  // render component
  return (
    <div id='map' className="map-container"></div>
  )
}

export default MapWrapper