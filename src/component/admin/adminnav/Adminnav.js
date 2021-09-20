import React from 'react';
import './adminnav.css'
import {  BrowserRouter as Router, useRouteMatch, Switch, Route , NavLink } from 'react-router-dom';
import Adminmain from '../AdminControl/Adminmain';
import AdminShopRq from '../shoprq/AdminShopRq';



const Adminnav = () => {

    
    
    return (
        <>
            <Adminmain />
        </>
    );
};

export default Adminnav;