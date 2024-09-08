import React from 'react';
import Image from '../assets/aboutUs.webp';

const AboutSection = () => (
  <section className="my-5">
    <div className="py-5">
      <h2 className="text-center">Explore the Culture<br /></h2>
      {/* <div className='container1'></div> */}
    </div>
    <div className="container-fluid">
      <div className="about-row">
        <div className='sub-part'>
            <div className="col-lg-6 col-md-6 col-12 aboutus-img">
            <img src={Image} className="img-fluid abouting" alt="Kashmir" />
            </div>
            <div className="col-lg-6 col-md-6 col-12  ">
            <h2 className="display-4">Culture of India</h2>
            <p className="py-3 caption" >India's culture is a vibrant tapestry of diverse traditions, languages, and festivals, reflecting 
                its rich history and heritage. It celebrates unity in diversity through colorful festivals, intricate art forms, and 
                diverse culinary practices. Spirituality and family values play a significant role, influencing daily life and social 
                norms.New places, Hidden gems, history, culture and our heritage everything you need to know is here!</p>
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
