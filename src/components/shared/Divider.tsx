import React from 'react';
import styled from 'styled-components';

const Divider: React.FC = (props) => <DividerStyled>{props.children}</DividerStyled>;

export default Divider;

const DividerStyled = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 50px;
    text-align: left;
    font: normal normal normal 20px ${(props) => props.theme.typography.fontFamily};
    letter-spacing: 0px;
    color: #9c9c9c;
    opacity: 1;

    &:before,
    &:after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #9c9c9c;
    }

    &:not(:empty)::before {
        margin-right: 20px;
    }

    &:not(:empty)::after {
        margin-left: 20px;
    }
`;
