import React, { useState } from 'react';
import ladakh from '../assets/ladakh.jpg';
import kerala from '../assets/kerala.webp';
import gujarat from '../assets/Gujarat.avif';
import rajasthan from '../assets/Rajasthan.jpg';

const Recommendations = () => {
    const recommendations = [
        {
            img: ladakh,
            title: 'Ladakh',
            description: 'Leh, Jammu & Kashmir',
        },
        {
            img: kerala,
            title: 'Kerala',
            description: "God's Own Country",
        },
        {
            img: gujarat,
            title: 'Gujarat',
            description: 'Tropical Paradise',
        },
        {
            img: rajasthan,
            title: 'Rajasthan',
            description: 'The Land of Kings',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSwap = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
    };

    const currentRecommendation = recommendations[currentIndex];

    return (
        <section className="my-5">
            <div className="py-5">
                <h2 className="text-center">Services</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className="card">
                            <img className="card-img-top" src={currentRecommendation.img} alt={currentRecommendation.title} />
                            <div className="card-body">
                                <h4 className="card-title">{currentRecommendation.title}</h4>
                                <p className="card-text">{currentRecommendation.description}</p>
                                <button onClick={handleSwap} className="btn btn-primary">Next Destination</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
