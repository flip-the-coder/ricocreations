import React from 'react';
import styled, { CSSProperties, keyframes } from 'styled-components';

const spin = keyframes`
    from{transform: rotate(0deg);}
    to{transform: rotate(360deg);}
`;

const SpinnerContainer = styled.div<{ size?: string; borderSize?: number }>`
    opacity: 0.8;
    border: ${(props) => (props.borderSize ? props.borderSize : 5)}px solid #e0e0e0;
    border-top-color: #8a8a8a;
    width: ${(props) => (props.size ? props.size : '50px')};
    height: ${(props) => (props.size ? props.size : '50px')};
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

interface SpinnerProps {
    size?: string;
    className?: string;
    style?: CSSProperties;
    borderSize?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size, className, style, borderSize }) => {
    return (
        <Container className={className} style={style}>
            <SpinnerContainer size={size} borderSize={borderSize} />
        </Container>
    );
};

export default Spinner;
