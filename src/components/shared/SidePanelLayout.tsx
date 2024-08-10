import React from 'react';
import styled from 'styled-components';
import { useStores } from '../../hooks/useStores';
import Spinner from '../Spinner';

const SidePanelSpinner: React.FC = () => (
    <SpinnerStyle>
        <Spinner size={'30px'} />
    </SpinnerStyle>
);

const SidePanelLayout: React.FC<{ children: React.ReactNode; isLoading?: boolean; minWidth?: string }> = ({
    children,
    isLoading,
    minWidth
}) => {
    const { appStore } = useStores();

    return (
        <SidePanel minWidth={minWidth!} headerHeight={appStore.cssHeaderHeight}>
            <SidePanelContainer>
                <PanelContentContainer headerHeight={appStore.cssHeaderHeight}>
                    {isLoading && <SidePanelSpinner />}
                    {children}
                </PanelContentContainer>
            </SidePanelContainer>
        </SidePanel>
    );
};

SidePanelLayout.defaultProps = {
    isLoading: false,
    minWidth: '423px'
};

export default SidePanelLayout;

const SpinnerStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.8;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`;

const SidePanel = styled.aside<{ minWidth: string; headerHeight: string }>`
    height: calc(100vh - ${(props) => props.headerHeight});
    max-width: 100%;
    min-width: ${(props) => props.minWidth};
    background-color: ${(props) => props.theme.colors.neutrals[0]};
    border-right: 1px solid #cccccc;
    background-size: cover;
    color: ${(props) => props.theme.colors.primary};
    overflow: auto;

    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    z-index: 2;

    @media only screen and (max-width: 1025px) {
        min-width: 100%;
        position: relative;
        height: 100%;
    }

    /* Landscape */
    @media only screen and (min-device-width: 200px) and (max-device-width: 900px) and (max-device-height: 1000px) and (orientation: landscape) and (min-aspect-ratio: 13/9) {
        display: none;
    }
`;

const SidePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`;

const PanelContentContainer = styled.div<{ headerHeight: string }>`
    position: absolute;
    transition: top 500ms ease-in-out;
    overflow-x: hidden;
    height: calc(100vh - ${(props) => props.headerHeight});
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: no wrap;

    @media only screen and (max-width: 1025px) {
        height: 100%;
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
    }
`;
