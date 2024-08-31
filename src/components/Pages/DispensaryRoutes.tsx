import { observer } from 'mobx-react-lite';
import React from 'react';
import Layout from './Layout';

const DispensaryRoutes = ({ children }) => {
    return <Layout>{children}</Layout>;
};

export default observer(DispensaryRoutes);
