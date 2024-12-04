import React, { lazy, Suspense } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MEDIUM_DEVICE_WIDTH } from './utils/browserUtils';
import NotificationProvider from './components/Notification/NotificationProvider';
import { Route, Routes, Navigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Loader from './components/Loader';
import ChangeAnswerSpinner from './components/UI/ChangeAnswerSpinner';
import { useStores } from './hooks/useStores';
import { DEFAULT_THEME } from './stores/ThemeStore';
import DispensaryRoutes from './components/Pages/DispensaryRoutes';

const Home = lazy(() => import('./components/Pages/Products/Home'));
const Dispensary = lazy(() => import('./components/Pages/Dispensary/Dispensary'));
const ContactUs = lazy(() => import('./components/Pages/ContactUs/ContactUs'));
const Events = lazy(() => import('./components/Pages/Events/Events'));
const ShoppingCart = lazy(() => import('./components/Pages/ShoppingCart/ShoppingCart'));

const InitialReactPage = () => {
    const { themeStore, intlStore } = useStores();

    return (
        <IntlProvider locale={intlStore.locale} messages={intlStore.messages} defaultLocale={'en'}>
            <ThemeProvider theme={DEFAULT_THEME}>
                {themeStore.isLoadingTheme && <Loader />}
                <NotificationProvider>
                    <GlobalStyle theme={themeStore.theme} />
                    <Suspense fallback={<ChangeAnswerSpinner isVisible />}>
                        <Routes>
                        <Route
                                path="/home"
                                element={
                                    <DispensaryRoutes>
                                        <Home />
                                    </DispensaryRoutes>
                                }
                            />
                            <Route
                                path="/dispensary"
                                element={
                                    <DispensaryRoutes>
                                        <Dispensary />
                                    </DispensaryRoutes>
                                }
                            />
                            <Route
                                path="/events"
                                element={
                                    <DispensaryRoutes>
                                        <Events />
                                    </DispensaryRoutes>
                                }
                            />
                            <Route
                                path="/contact"
                                element={
                                    <DispensaryRoutes>
                                        <ContactUs />
                                    </DispensaryRoutes>
                                }
                            />
                            <Route
                                path="/cart"
                                element={
                                    <DispensaryRoutes>
                                        <ShoppingCart />
                                    </DispensaryRoutes>
                                }
                            />

                            <Route
                                path="*"
                                element={
                                    <DispensaryRoutes>
                                        <Navigate to={'/home'} />
                                    </DispensaryRoutes>
                                }
                            />
                        </Routes>
                    </Suspense>
                </NotificationProvider>
            </ThemeProvider>
        </IntlProvider>
    );
};

function App() {
    return <InitialReactPage />;
}

export default App;

const GlobalStyle = createGlobalStyle<{ theme: any }>`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

html, body {
    font-family: Montserrat, sans-serif;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #979797;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        overscroll-behavior: none;
    }
}

h2 {
    font-family: Arial, sans-serif;
    font-weight: normal;
    font-size: 1.5rem; 
    font-style: normal;
    margin-bottom: 1rem;

    @media (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        font-size: 1.25rem; 
    }
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: inherit;
}

::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 3px;
}
}`;
