import React from 'react';
import Navber from '../Commponents/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Commponents/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div>
            <ToastContainer />
            <div className='px-[6%]'>
                <Navber></Navber>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;