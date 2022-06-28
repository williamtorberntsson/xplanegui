import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from "esri-loader";
import "./WAD.css";
import arrowTarget from '../assets/img/mapIcons/arrowTarget.png'
import arrow from '../assets/img/mapIcons/arrowMe.png'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import Point from '@arcgis/core/Viewpoint'



const Esri = () => {
    const mapRef = useRef(null);
    CreateMap(mapRef);

    return (
        <div className='map-view' ref={mapRef}>
        </div>
    )
}

const CreateMap = (mapRef) => {
    const [coords, setCoords] = useState([59.317298, 18.043223]); //Start coordinates

    useEffect(() => {
        let view;

        const InitializeMap = async (mapRef) => {
            const modules = ['esri/Map', 'esri/views/MapView'];
            const [Map, MapView] = await loadModules(modules);
            const map = new Map({ basemap: 'gray-vector' });
            const view = new MapView({
                map: map,
                zoom: 5,
                container: mapRef.current,
                center: [-104, 38],
            });

        };

        InitializeMap(mapRef);
        // Navigate(view)

        return () => {
            view?.destroy();
        }
    }, [mapRef]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCoords([coords[0] + 0.0001, coords[1] + 0.001]);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });

    // useEffect((view) => {
    //     view.goTo({
    //         center: coords,
    //         heading: 180,
    //         tilt: 45
    //     });

    // }, [coords]);


    console.log(coords)
}

export default Esri