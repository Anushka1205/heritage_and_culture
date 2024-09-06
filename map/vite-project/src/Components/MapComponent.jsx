import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../app.css'; // Import the CSS file

// Function to create dynamic icons
const createDynamicIcon = (text) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="icon">${text}</div>`,
    iconSize: [40, 60], // Size of the icon (including the pointy part)
    iconAnchor: [20, 50], // Anchor point of the icon (bottom center)
    popupAnchor: [0, -50], // Popup anchor point
  });
};

// Component to handle zoom-controlled markers
const ZoomControlledMarkers = ({ locations }) => {
  const map = useMap();
  const [visibleMarkers, setVisibleMarkers] = useState(locations);

  const minZoom = 12;

  useEffect(() => {
    const handleZoom = () => {
      const currentZoom = map.getZoom();
      if (currentZoom >= minZoom) {
        setVisibleMarkers(locations);
      } else {
        setVisibleMarkers([]);
      }
    };

    map.on('zoomend', handleZoom);
    handleZoom();

    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, locations]);

  return (
    <>
      {visibleMarkers.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={createDynamicIcon(location.name[0])} // Use the first letter of the name for the icon
        >
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const MapComponent = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <MapContainer center={[26.9124, 75.7873]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControlledMarkers locations={locations} />
    </MapContainer>
  );
};

export default MapComponent;
