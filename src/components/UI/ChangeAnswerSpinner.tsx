import * as React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { SpinnerGif } from './SpinnerGif';

interface IChangeAnswerSpinnerProps {
    width?: string;
    height?: string;
    spinnerSize?: string;
    isVisible?: boolean;
    fullScreen?: boolean;
    isSideMenu?: boolean;
    isCachedMessage?: boolean;
    message?: string;
}

const ChangeAnswerSpinner: React.FC<IChangeAnswerSpinnerProps> = (props) => {
    if (!props.isCachedMessage) {
        return (
            <Container
                id="change-answer-spinner"
                isVisible={props.isVisible}
                fullScreen={props.fullScreen}
                isSideMenu={props.isSideMenu}
            >
                <InfoText>{props.message}</InfoText>
                <ImageWrapper>
                    <SpinnerGif size={props.spinnerSize} />
                </ImageWrapper>
            </Container>
        );
    }
    return (
        <Container
            id="change-answer-spinner"
            isCachedMessage={props.isCachedMessage}
            isVisible={props.isVisible}
            fullScreen={props.fullScreen}
            isSideMenu={props.isSideMenu}
        >
            <Header></Header>
            <InfoText>{props.message}</InfoText>
            <ImageWrapper className={'isCached'}>
                <SpinnerGif size={props.spinnerSize} />
            </ImageWrapper>
        </Container>
    );
};

ChangeAnswerSpinner.defaultProps = {
    spinnerSize: '40px',
    message: 'Loading'
};

export default ChangeAnswerSpinner;

const fadeIn = keyframes`
    0% {
        opacity: .5;
    }
    100% {
        opacity: .80;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: .80;
    }
    60% {
        opacity: .5;
    }
    100% {
        opacity: 0;
    }
`;

const Container = styled.div<{
    isVisible?: boolean;
    fullScreen?: boolean;
    isSideMenu?: boolean;
    isCachedMessage?: boolean;
}>`
    margin-left: ${(props) =>
        !props.fullScreen && !props.isSideMenu ? '423px' : !props.fullScreen && props.isSideMenu ? '491px' : '0'};
    height: ${(props) => (!props.fullScreen ? 'calc(100vh - 62px)' : '100vh')};
    position: ${(props) => (!props.fullScreen ? 'absolute' : 'fixed')};
    top: ${(props) => (!props.fullScreen ? 'inherit' : '0')};
    width: ${(props) =>
        !props.fullScreen && !props.isSideMenu
            ? 'calc(100vw - 423px)'
            : !props.fullScreen && props.isSideMenu
            ? 'calc(100vw - 491px)'
            : '100vw'};
    left: 0;
    z-index: 2;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    visibility: ${(props) => (!props.isVisible ? 'hidden' : 'visible')};
    animation: ${(props) => (!props.isVisible ? fadeOut : fadeIn)} 2.5s linear;
    transition: visibility 2.5s linear;
    opacity: ${(props) => (!props.isCachedMessage ? '0.8' : '0.9')};

    @media only screen and (max-width: 1280px) {
        margin-left: 0px !important;
        width: 100%;
        top: ${(props) => (!props.fullScreen ? '80px' : '0px')};
        height: ${(props) => (!props.fullScreen ? '100%' : '100vh')};
    }
`;

const ImageWrapper = styled.div<IChangeAnswerSpinnerProps>`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '250px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.isCached {
        img {
            top: -35px;
        }
    }
    img {
        opacity: 0.75;
    }
`;

const Header = styled.div<IChangeAnswerSpinnerProps>`
    font-family: Montserrat;
    font-size: 30px;
    color: #9c9c9c;
    line-height: 40px;
    text-align: center;
    margin-bottom: 15px;

    @media only screen and (max-width: 1280px) {
        font-size: 22px;
    }
`;

const InfoText = styled.div<IChangeAnswerSpinnerProps>`
    font-family: Montserrat;
    color: #9c9c9c;
    line-height: 32px;
    font-size: 24px;
    text-align: center;
    font-weight: 400;

    @media only screen and (max-width: 1280px) {
        font-size: 18px;
    }
`;
