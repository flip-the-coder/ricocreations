import React from 'react';
import LoginLayout from './LoginLayout';
import MainPage from '../../../NavigationBar';

const LoginRoutes = ({ children }) => {
    return (
        <>
            <MainPage />
            <LoginLayout>{children}</LoginLayout>
        </>
    );
};

export default LoginRoutes;
