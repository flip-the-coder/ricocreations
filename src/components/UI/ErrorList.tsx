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
    margin: 10px 0;
    ul {
        background-color: '#d63831';
        list-style-type: none;
        padding: 0;
        padding: 10px;

        li {
            background-size: cover;
            font-family: Montserrat;
            font-size: 12px;
            color: #d63831;
            font-weight: 500;
            text-decoration: none solid #d63831;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`;
