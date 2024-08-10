import { observer } from 'mobx-react-lite';
import React from 'react';
import { useIntl } from 'react-intl';
import { Navigate } from 'react-router-dom';
import MyHomesLayout from './MyHomesLayout';
import { useStores } from './hooks/useStores';

const MyHomesRoutes = ({ children }) => {
    const { appStore, authStore } = useStores();
    const { formatMessage: f } = useIntl();
    const isAuthenticated = authStore.isLoggedIn;

    React.useEffect(() => {
        appStore.setPageTitle2(f({ id: 'MyHomes.PageTitle' }));
    }, [appStore, f]);

    if (!isAuthenticated) return <Navigate to={{ pathname: '/login' }} replace />;

    return <MyHomesLayout>{children}</MyHomesLayout>;
};

export default observer(MyHomesRoutes);
