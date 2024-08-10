import styled from 'styled-components';

const EditorContainer = styled.div`
    position: relative;
    width: 100%;

    /* Landscape */
    @media only screen and (min-device-width: 200px) and (max-device-width: 900px) and (max-device-height: 1000px) and (orientation: landscape) and (min-aspect-ratio: 13/9) {
        display: flex;
        justify-content: center;
    }
`;

export default EditorContainer;
