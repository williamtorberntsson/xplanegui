import { React } from 'react';
import ArcGisMap from './ArcGisMap';

function Nav_map({ useXplaneData, myAirPlaneData, aiPlaneData, offlineData }) {
  const nrAiPlanes = 5;

  return <ArcGisMap zoom={8} useXplaneData={useXplaneData} myAirPlaneData={myAirPlaneData} aiPlaneData={aiPlaneData} nrAiPlanes={nrAiPlanes} offlineData={offlineData} />
}

export default Nav_map