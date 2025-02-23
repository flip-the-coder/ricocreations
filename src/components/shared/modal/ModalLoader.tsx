import React from 'react';
import styled from 'styled-components';
import Spinner from '../../UI/Spinner';

interface ModalLoaderProps {
    isLoading: boolean;
}

const ModalLoader: React.FC<ModalLoaderProps> = ({ isLoading }) => (
    <SpinnerContainer isVisible={isLoading}>
        <Spinner />
    </SpinnerContainer>
);

export default ModalLoader;

const SpinnerContainer = styled.div<{ isVisible?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    height: 100%;
    width: 100%;
    z-index: ${(props) => (props.isVisible ? 1 : -1)};
    visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
    opacity: 0.9;
`;
