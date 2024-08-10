import React from 'react';
import styled from 'styled-components';
import Spinner from '../../Spinner';

const OptionContainerSpinner: React.FC = () => (
    <SpinnerStyle>
        <Spinner size={'30px'} />
    </SpinnerStyle>
);

const ScrollableOptionModalBody: React.FC<{ children: React.ReactNode; isLoading?: boolean; minWidth?: string }> = ({
    children,
    isLoading,
    minWidth
}) => {
    return (
        <Container minWidth={minWidth!} headerHeight={'750px'}>
            <ModalBoundaries>
                <ContentContainer headerHeight={'750px'}>
                    {isLoading && <OptionContainerSpinner />}
                    <ScrollBarContainerProps>{children}</ScrollBarContainerProps>
                </ContentContainer>
            </ModalBoundaries>
        </Container>
    );
};

ScrollableOptionModalBody.defaultProps = {
    isLoading: false,
    minWidth: '500px'
};

export default ScrollableOptionModalBody;

const SpinnerStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.8;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`;

const Container = styled.aside<{ minWidth: string; headerHeight: string }>`
    height: 200px;
    min-width: ${(props) => props.minWidth};
    border-right: 1px solid #cccccc;
    background-size: cover;

    display: flex;
    flex-direction: column;

    z-index: 2;

    @media only screen and (max-width: 1025px) {
        min-width: 100%;
        height: 100%;
    }

    /* Landscape */
    @media only screen and (min-device-width: 200px) and (max-device-width: 900px) and (max-device-height: 1000px) and (orientation: landscape) and (min-aspect-ratio: 13/9) {
        display: none;
    }
`;

const ModalBoundaries = styled.div`
    flex-direction: column;
    position: relative;
`;

const ScrollBarContainerProps = styled.div`
    height: 200px;
    width: 395px;
    position: relative;
`;

const ContentContainer = styled.div<{ headerHeight: string }>`
    position: absolute;
    transition: top 500ms ease-in-out;
    overflow-x: hidden;
    height: 400px
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: no wrap;

    @media only screen and (max-width: 1025px) {
        height: 100%;
        position: relative;
        overflow-x: auto;
    }
`;
