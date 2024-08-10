import { observer } from 'mobx-react-lite';
import React from 'react';
import MainPage from '../NavigationBar';

const Dispensary: React.FC = () => {
    return <MainPage />;
};

export default observer(Dispensary);
