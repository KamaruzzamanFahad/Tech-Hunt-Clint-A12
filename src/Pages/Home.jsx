import React from 'react';
import Banner from '../Commponents/Banner';
import Product from '../Commponents/Product';
import FeaturedProducts from '../Commponents/FeaturedProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Product></Product>
            <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Home;