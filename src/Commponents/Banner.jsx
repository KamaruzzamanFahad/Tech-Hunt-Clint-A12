import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
    return (

        <Carousel className="text-center" showArrows={true} >
            <div>
                <img src="/1.jpg" />
            </div>
            <div>
                <img src="/2.jpg" />
            </div>
            <div>
                <img src="/3.jpg" />
            </div>
        </Carousel>

    );
};

export default Banner;