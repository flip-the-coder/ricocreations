import React from 'react';
import styled from 'styled-components';
import ModalLoader from './ModalLoader';

interface Props {
    isLoading?: boolean;
    width?: string;
}

const ModalInnerContainer: React.FC<Props> = (props) => {
    return (
        <ModalContainer width={props.width}>
            <ModalLoader isLoading={props.isLoading!} />
            {props.children}
        </ModalContainer>
    );
};

ModalInnerContainer.defaultProps = {
    isLoading: false
};

export default ModalInnerContainer;

const ModalContainer = styled.div<{ width?: string }>`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #ebebeb;
    opacity: 1;

    ${({ width }) =>
        width &&
        `
        width: ${width};
    `}
`;
