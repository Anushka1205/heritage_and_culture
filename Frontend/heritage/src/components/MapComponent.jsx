import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to create dynamic icons with images
const createImageIcon = (imageUrl) => {
  if (!imageUrl) {
    console.error('Image URL is not provided');
    return L.icon({
      iconUrl: 'path/to/default-icon.png', // Fallback to a default icon if imageUrl is not provided
      iconSize: [40, 40], // Size of the marker
      iconAnchor: [20, 40], // Anchor point (center bottom)
      popupAnchor: [0, -40], // Popup anchor point
      className: 'custom-marker', // Custom class for additional styling
    });
  }

  console.log('Creating icon with URL:', imageUrl); // Log the URL being used

  return L.icon({
    iconUrl: imageUrl, // Use the image URL for the icon
    iconSize: [40, 40], // Size of the marker
    iconAnchor: [20, 40], // Anchor point (center bottom)
    popupAnchor: [0, -40], // Popup anchor point
    className: 'custom-marker', // Custom class for additional styling
  });
};

// Modal component to show detailed information
const LocationModal = ({ show, onHide, location }) => {
  if (!location) return null; // If no location is provided, return nothing

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">{location.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-image-container">
          <img src={location.img1} alt={location.name} className="modal-image" />
        </div>
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
          icon={createImageIcon(location.img1)} // Use the first image for the marker
          eventHandlers={{
            click: () => handleMarkerClick(location), // Handle marker click
          }}
        />
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
    fetch('http://localhost:5000/api/locations') // Adjust the API endpoint if necessary
      .then(response => response.json())
      .then(data => {
        console.log('Fetched locations:', data); // Log data to verify structure
        setLocations(data);
      })
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
