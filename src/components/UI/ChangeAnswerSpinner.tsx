import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { SpinnerGif } from './SpinnerGif';

interface IChangeAnswerSpinnerProps {
    width?: string;
    height?: string;
    spinnerSize?: string;
    isVisible?: boolean;
    message?: string;
}

const ChangeAnswerSpinner: React.FC<IChangeAnswerSpinnerProps> = ({
    width = '100%',
    height = '250px',
    spinnerSize = '40px',
    isVisible = true,
    message = 'Loading'
}) => {
    return (
        <Container isVisible={isVisible}>
            <Content>
                <InfoText>{message}</InfoText>
                <ImageWrapper width={width} height={height}>
                    <SpinnerGif size={spinnerSize} />
                </ImageWrapper>
            </Content>
        </Container>
    );
};

export default ChangeAnswerSpinner;

const fadeIn = keyframes`
    0% { opacity: 0.5; }
    100% { opacity: 0.8; }
`;

const fadeOut = keyframes`
    0% { opacity: 0.8; }
    60% { opacity: 0.5; }
    100% { opacity: 0; }
`;

const Container = styled.div<{ isVisible?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
    animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 2.5s linear;
    transition: visibility 2.5s linear;
`;

const Content = styled.div`
    text-align: center;
`;

const ImageWrapper = styled.div<IChangeAnswerSpinnerProps>`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '250px'};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        opacity: 0.75;
    }
`;

const InfoText = styled.div`
    font-family: Montserrat, sans-serif;
    color: #9c9c9c;
    line-height: 32px;
    font-size: 24px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 15px;

    @media only screen and (max-width: 1280px) {
        font-size: 18px;
    }
`;
