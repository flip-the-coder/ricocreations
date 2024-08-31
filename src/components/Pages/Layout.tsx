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

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;  /* Prevents overflow on the main container */
`;

const MyHomesContent = styled.div`
    background: white;
    flex: 1;  /* Allows content to fill remaining space */
    overflow-y: auto;  /* Enables vertical scrolling */
    padding: 20px;  /* Adds padding for better spacing */

    @media (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        padding: 10px;  /* Adjust padding for smaller screens */
        box-sizing: border-box;  /* Ensures padding is included in the element's total width and height */
    }
`;
