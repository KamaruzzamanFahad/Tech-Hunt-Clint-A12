import React from 'react';
import Banner from '../Commponents/Banner';
import FeaturedProducts from '../Commponents/FeaturedProducts';
import TrandingProducts from '../Commponents/TrandingProducts';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrandingProducts></TrandingProducts>
        </div>
    );
};

export default Home;