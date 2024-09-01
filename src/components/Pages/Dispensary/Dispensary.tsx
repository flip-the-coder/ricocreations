import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
`;

const Header = styled.h1`
    font-size: 2rem;
    color: #3a3a3a;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

const Card = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin: 10px;
    max-width: 300px;
    text-align: center;
`;

const Dispensary = () => {
    return (
        <Container>
            <Header>Welcome to Our Dispensary!</Header>
            <p>Discover a variety of products and services we offer. Get in touch with Jessica to learn more about our latest offerings and specials!</p>
            <Button>Contact Us</Button>
            <Button>View Products</Button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card>
                    <h2>Product 1</h2>
                    <p>Description of product 1.</p>
                </Card>
                <Card>
                    <h2>Product 2</h2>
                    <p>Description of product 2.</p>
                </Card>
                <Card>
                    <h2>Product 3</h2>
                    <p>Description of product 3.</p>
                </Card>
            </div>
        </Container>
    );
};

export default Dispensary;
