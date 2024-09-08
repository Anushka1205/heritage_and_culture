import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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

// Modal component to show detailed information
const LocationModal = ({ show, onHide, location }) => {
  if (!location) return null; // If no location is provided, return nothing

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{location.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Description:</strong> {location.description}</p>
        <p><strong>Coordinates:</strong> {location.latitude}, {location.longitude}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Component to handle zoom-controlled markers
const ZoomControlledMarkers = ({ locations }) => {
  const map = useMap();
  const [visibleMarkers, setVisibleMarkers] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState(null); // Track the selected location
  const [modalShow, setModalShow] = useState(false); // Track modal visibility

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

  const handleMarkerClick = (location) => {
    setSelectedLocation(location); // Set the selected location
    setModalShow(true); // Show the modal
  };

  return (
    <>
      {visibleMarkers.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={createDynamicIcon(location.name[0])} // Use the first letter of the name for the icon
          eventHandlers={{
            click: () => handleMarkerClick(location), // Handle marker click
          }}
        >
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      ))}
      {/* Modal to show location details */}
      <LocationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        location={selectedLocation}
      />
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
