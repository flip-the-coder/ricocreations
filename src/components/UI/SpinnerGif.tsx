import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    from{transform: rotate(0deg);}
    to{transform: rotate(360deg);}
`;

const SpinnerContainer = styled.div<{ size?: string }>`
    position: relative;
    top: auto;
    left: auto;
    opacity: 0.8;
    border: 5px solid #e0e0e0;
    border-top-color: #8a8a8a;
    width: ${(props) => (props.size ? props.size : '60px')};
    height: ${(props) => (props.size ? props.size : '60px')};
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`;

export const SpinnerGif: React.FC<{ size?: string }> = ({ size }) => {
    return <SpinnerContainer size={size} />;
};
