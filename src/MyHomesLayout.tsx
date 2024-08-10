import React from 'react';
import MyHomesHeader from './MyHomesHeader';
import styled from 'styled-components';

const MyHomesLayout = ({ children }) => {
    return (
        <div style={{ overflow: 'hidden', height: '100vh' }}>
            <MyHomesHeader />
            <MyHomesContent style={{ overflow: 'auto', height: 'calc(100vh - 60px)' }}>{children}</MyHomesContent>
        </div>
    );
};

export default MyHomesLayout;

const MyHomesContent = styled.div`
    background: white;
    width: 100%;
`;
