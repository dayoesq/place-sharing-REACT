import React, { useEffect, useRef } from 'react';
import mapboxGL from 'mapbox-gl';

import './Map.css';

mapboxGL.accessToken = process.env.REACT_APP_MB_TOKEN;

const Map = props => {
  const mapRef = useRef(null);
  const { center, zoom } = props;
  useEffect(() => {
    const map = new mapboxGL.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom
    });
    new mapboxGL.Marker()
    .setLngLat(center)
    .addTo(map);
  }, [center, zoom]);
  return <div className={`map ${props.className}`} style={props.style} ref={mapRef}></div>
};

export default Map;