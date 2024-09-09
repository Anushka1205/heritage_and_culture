import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import monumentimg from '../assets/monuments.jpg';
import tajmahal from '../assets/tajmahal.jpeg';
import hawamahal from '../assets/hawamahal.jpg';
import redfort from '../assets/redfort.jpeg';
import goldentemple from '../assets/goldentemple.jpeg';
import qutubminar from '../assets/qutubminar.jpeg';

// Monument schema
const monuments = [
  {
    id: 1,
    name: 'Taj Mahal',
    image: tajmahal,
    description: 'The Taj Mahal, located in Agra, India, is a symbol of eternal love. Built in the 17th century by Mughal Emperor Shah Jahan, it is a magnificent white marble mausoleum.'
  },
  {
    id: 2,
    name: 'Hawa Mahal',
    image: hawamahal,
    description: 'Hawa Mahal, or the Palace of Winds, is an iconic landmark in Jaipur, India. Known for its unique facade with 953 small windows, it was designed to allow royal women to observe street life without being seen.'
  },
  {
    id: 3,
    name: 'Red Fort',
    image: redfort,
    description: 'The Red Fort, located in Delhi, India, was the main residence of Mughal emperors for over 200 years. It is a UNESCO World Heritage Site and a symbol of India’s rich history and culture.'
  },
  {
    id: 4,
    name: 'Golden Temple',
    image: goldentemple,
    description: 'The Golden Temple, also known as Harmandir Sahib, is a Sikh gurdwara located in Amritsar, India. It is the holiest site in Sikhism and known for its stunning gold-plated structure and serene surroundings.'
  },
  {
    id: 5,
    name: 'Qutub Minar',
    image: qutubminar,
    description: 'Qutub Minar is a UNESCO World Heritage Site in Delhi, India. It is the tallest brick minaret in the world, standing at 73 meters, and was built in the early 13th century as a victory tower.'
  }
];

const Navbar = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentMonumentIndex, setCurrentMonumentIndex] = useState(0);

  // Toggle popup visibility
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  // Slide to the previous or next monument
  const changeMonument = (direction) => {
    let newIndex = currentMonumentIndex + direction;
    if (newIndex < 0) newIndex = monuments.length - 1;
    if (newIndex >= monuments.length) newIndex = 0;
    setCurrentMonumentIndex(newIndex);
  };

  return (
    <nav className="navbar navbar-expand-sm justify-content-center">
      <div className="container-fluid nav-bar">
        <h1 className="navbar-brand" style={{ color: '#e5a586' }}>BHRमण</h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" style={{ color: '#090506' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore" style={{ color: '#090506' }}>Explore</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: '#090506' }}>About Us</Link>
            </li>
            <li className='nav-link'>
              {/* Only one image on the navbar */}
              <img
                src={monumentimg} // Generic image for navbar
                alt="monuments"
                onClick={togglePopup}
                style={{ cursor: 'pointer', marginRight: '10px' }}
              />
            </li>
          </ul>
          <div className="search-container">
            <form id="search-form">
              <input type="text" placeholder="Search..." name="search" id="search-input" />
              <button type="submit" style={{ color: '#fff' }}>Search</button>
            </form>
            <div id="search-results"></div>
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
      {isPopupVisible && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {/* Image and Description from Schema */}
            <img
              src={monuments[currentMonumentIndex].image}
              alt={monuments[currentMonumentIndex].name}
              className="popup-image"
              style={{ width: '100%' }}
            />
            <div className="popup-description">
              <h3>{monuments[currentMonumentIndex].name}</h3>
              <p>{monuments[currentMonumentIndex].description}</p>
            </div>
            <div className="carousel-controls">
              <button onClick={() => changeMonument(-1)} className="prev-btn">❮</button>
              <button onClick={() => changeMonument(1)} className="next-btn">❯</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
