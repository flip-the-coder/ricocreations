import styled from 'styled-components';

const PageContainer = styled.div<{ headerHeight: string }>`
    display: flex;
    flex-direction: row;
    height: calc(100vh - ${(props) => props.headerHeight});
    overflow: auto;

    overflow: hidden;
    width: 100%;
    position: relative;

    @media only screen and (max-width: 1025px) {
        transition: all 1s;
        width: 100%;
        height: calc(100vh);
        overflow: hidden;
        display: flex;
        flex-direction: column-reverse;
    }

    /* Landscape */
    @media only screen and (min-device-width: 200px) and (max-device-width: 900px) and (max-device-height: 1000px) and (orientation: landscape) and (min-aspect-ratio: 13/9) {
        height: 100%;
        width: 100%;
    }
`;

export default PageContainer;
