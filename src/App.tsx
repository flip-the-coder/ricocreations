import React, { lazy, Suspense } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MEDIUM_DEVICE_WIDTH } from './utils/browserUtils';
import NotificationProvider from './components/Notification/NotificationProvider';
import { Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Loader from './components/Loader';
import ChangeAnswerSpinner from './components/UI/ChangeAnswerSpinner';
import { useStores } from './hooks/useStores';
import { DEFAULT_THEME } from './stores/ThemeStore';
import AboutMe from './components/Pages/AboutMe/AboutMe';
import DispensaryRoutes from './components/Pages/Dispensary/DispensaryRoutes';

// Lazy-loaded pages
const Home = lazy(() => import('./components/Pages/Home'));
const Dispensary = lazy(() => import('./components/Pages/Dispensary/Dispensary'));
const ContactUs = lazy(() => import('./components/Pages/ContactUs/ContactUs'));

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
                            <Route path="/dispensary" element={<DispensaryRoutes><Dispensary /></DispensaryRoutes>} />
                            <Route path="/aboutMe" element={<DispensaryRoutes><AboutMe /></DispensaryRoutes>} />
                            <Route path="/contact" element={<DispensaryRoutes><ContactUs /></DispensaryRoutes>} />
                            <Route path="*" element={<DispensaryRoutes><Home /></DispensaryRoutes>} />
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
        width: 100%;
        margin: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;

        :not(input):not(textarea) {
            @media (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
            }
        }
    }

    ::before, ::after {
        box-sizing: inherit;
    }

    html, body {
        font-family: Montserrat;
        width: 100%;
        height: 100%;

        @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
            overflow-x: hidden;
            position: relative;
            overscroll-behavior: none;
        }
    }

    h2 {
        font-family: Arial, sans-serif;
        font-weight: normal;
        font-size: 1.5rem; /* Adjust to your desired default font size */
        font-style: normal;
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
`;
