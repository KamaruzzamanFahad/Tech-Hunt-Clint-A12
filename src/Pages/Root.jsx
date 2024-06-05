import React from 'react';
import Navber from '../Commponents/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Commponents/Footer';

const Root = () => {
    return (
        <div>
            <div className='px-[6%]'>
                <Navber></Navber>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;