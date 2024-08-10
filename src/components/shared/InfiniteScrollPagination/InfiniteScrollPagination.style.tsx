import styled from 'styled-components';
import { MEDIUM_DEVICE_WIDTH } from '../../../utils/browserUtils';

export const Container = styled.div`
    width: inherit;
    height: inherit;
    overflow: auto;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        overflow-y: scroll;
    }
`;
