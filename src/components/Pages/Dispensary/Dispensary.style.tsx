import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f5;
    color: #333;
    font-family: 'Roboto', sans-serif;
`;

const Header = styled.h1`
    font-size: 2.5rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const SubHeader = styled.h2`
    font-size: 2rem;
    color: #34495e;
    margin: 1.5rem 0;

    @media (max-width: 768px) {
        font-size: 1.75rem;
    }
`;

const Text = styled.p`
    font-size: 1.1rem;
    line-height: 1.8;
    text-align: center;
    max-width: 800px;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0 10px;
    }
`;

const List = styled.ul`
    list-style: disc;
    margin: 10px 0;
    padding-left: 20px;
    text-align: left;
`;

const Button = styled.button`
    background-color: #1abc9c;
    color: white;
    border: none;
    padding: 12px 24px;
    margin: 15px 10px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #16a085;
        transform: translateY(-3px);
    }

    @media (max-width: 768px) {
        width: 100%;
        margin: 10px 0;
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
`;

interface CardProps {
    isOpen: boolean;
    isProduct: boolean;
}

const Card = styled.div<CardProps>`
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: ${(props) => (props.isProduct ? 'auto' : '100%')};
    max-width: ${(props) => (props.isProduct ? '100%' : 'none')};
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease, max-height 0.3s ease;
    overflow: hidden;
    max-height: ${(props) => (props.isOpen ? '400px' : '80px')}; /* Adjust height as needed */
    margin-bottom: 20px; /* Add spacing between cards */

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: ${(props) => (props.isOpen ? '0.5rem' : '0')};
    }

    p {
        font-size: 1rem;
        color: #7f8c8d;
        display: ${(props) => (props.isOpen ? 'block' : 'none')};
        margin: ${(props) => (props.isOpen ? '1rem 0' : '0')};
    }

    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const DispensaryStyles = {
    Container,
    CardContainer,
    Card,
    Header,
    SubHeader,
    Text,
    List,
    Button
};
