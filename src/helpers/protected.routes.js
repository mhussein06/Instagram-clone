import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const ProtectedRoutes = ({ user, children, ...rest }) => {
    return (
        user ? <Outlet /> : <Navigate
            to={{
                pathname: ROUTES.LOGIN,
            }}
         />
    )
}

export default ProtectedRoutes;