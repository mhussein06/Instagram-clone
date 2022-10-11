import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const IsUserLoggedIn = ({ user, children, ...rest }) => {
    return (
        (!user) ? <Outlet /> : <Navigate
            to={{
                pathname: ROUTES.DASHBOARD,
            }}
         />
    )
}

export default IsUserLoggedIn;