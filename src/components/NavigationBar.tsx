import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
    return (
        <Container>
            <Message>
                All I am saying is that Felipe is pretty amazing. Anyways hope you had a good day.
            </Message>
        </Container>
    );
};

export default HomePage;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Full viewport height */
    width: 100vw;  /* Full viewport width */
    padding: 20px; /* Padding for better spacing */
    box-sizing: border-box;
    background-color: #f0f0f0; /* Light background color for contrast */
`;

const Message = styled.div`
    text-align: center;
    font-size: 1.2em; /* Adjust font size as needed */
    color: #333; /* Dark text color for better readability */

    @media (max-width: 600px) {
        font-size: 1em; /* Adjust font size for smaller screens */
        padding: 10px; /* Adjust padding for smaller screens */
    }
`;
