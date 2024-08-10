import React from 'react';
import styled from 'styled-components';

type ErrorListProps = {
    errors: (string | undefined)[];
};

const ErrorList = (props: ErrorListProps) => {
    if (props.errors?.length === 0) return null;
    return (
        <Container>
            <ul>
                {props.errors.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </Container>
    );
};

export default ErrorList;

const Container = styled.ul`
    ul {
        background-color: grey;
        list-style-type: none;
        padding: 0;
        padding: 10px;

        li {
            background-size: cover;
            font-family: ${(props) => props.theme.typography.fontFamily};
            font-size: 12px;
            color: ${(props) => props.theme.colors.error};
            font-weight: 500;
            text-decoration: none solid #d63831;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`;
