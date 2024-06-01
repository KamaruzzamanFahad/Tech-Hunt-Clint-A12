import React from 'react';
import Navber from '../Commponents/Navber';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='px-[10%]'>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;