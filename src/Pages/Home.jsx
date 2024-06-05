import React from 'react';
import Banner from '../Commponents/Banner';
import Product from '../Commponents/Product';
import FeaturedProducts from '../Commponents/FeaturedProducts';
import TrandingProducts from '../Commponents/TrandingProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Product></Product>
            <FeaturedProducts></FeaturedProducts>
            <TrandingProducts></TrandingProducts>
        </div>
    );
};

export default Home;