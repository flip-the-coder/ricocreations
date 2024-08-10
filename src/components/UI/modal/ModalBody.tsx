import styled from 'styled-components';

export const ModalBody = styled.div<{ width?: string; height?: string; withOverflow?: boolean }>`
    padding: 15px 25px;
    height: ${(props) => (props.height ? props.height : 'inherit')};
    overflow-y: ${(props) => (props.withOverflow ? 'auto' : 'initial')};
`;

ModalBody.defaultProps = {
    withOverflow: true
};
