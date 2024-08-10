import React from 'react';
import styled from 'styled-components';
import { MEDIUM_DEVICE_WIDTH } from '../../../utils/browserUtils';
import DispensaryHeader from './Header/DispensaryHeader';

const DispensaryLayout = ({ children }) => {
    return (
        <div style={{ overflow: 'hidden', height: '100vh' }}>
            <DispensaryHeader />
            <MyHomesContent>{children}</MyHomesContent>
        </div>
    );
};

export default DispensaryLayout;

const MyHomesContent = styled.div`
    background: white;
    overflow: hidden;
    height: calc(100vh - 60px);

    @media (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        z-index: 0;
        position: relative;
    }
`;
