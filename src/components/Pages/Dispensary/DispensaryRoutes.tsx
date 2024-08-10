import { observer } from 'mobx-react-lite';
import React from 'react';
import { useIntl } from 'react-intl';
// import { Navigate } from 'react-router-dom';
import { useStores } from '../../../hooks/useStores';
import DispensaryLayout from './DispensaryLayout';

const DispensaryRoutes = ({ children }) => {
    const { appStore } = useStores();
    const { formatMessage: f } = useIntl();
    // const isAuthenticated = authStore.isLoggedIn;

    React.useEffect(() => {
        appStore.setPageTitle2(f({ id: 'MyHomes.PageTitle' }));
        // appStore.setIsMyHomes(true);
    }, [appStore, f]);

    // if (!isAuthenticated) return <Navigate to={{ pathname: '/login' }} replace />;

    return <DispensaryLayout>{children}</DispensaryLayout>;
};

export default observer(DispensaryRoutes);
