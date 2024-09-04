import React from 'react';
import styled from 'styled-components';
import { MEDIUM_DEVICE_WIDTH } from '../../utils/browserUtils';
import Header from '../Header/Header';

const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header />
            <MyHomesContent>{children}</MyHomesContent>
        </LayoutWrapper>
    );
};

export default Layout;

const headerHeight = 50;

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
`;

const MyHomesContent = styled.div`
    background: white;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;

    @media (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        padding: 10px;
        margin-top: ${headerHeight}px;
    }
`;
