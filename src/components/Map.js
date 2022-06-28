import './Map.css';

// react
import React, { useState, useEffect } from 'react';

// openlayers
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature';

// components
import MapWrapper from './MapWrapper';

function Map(props) {

  console.log(props.rotate)

  return (
    <div className="App">
      <MapWrapper rotate={props.rotate}/>
    </div>
  )
}

export default Map