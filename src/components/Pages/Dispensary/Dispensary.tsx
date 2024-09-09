import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    max-width: 1000px; /* Adjust this as needed */
`;

interface CardProps {
    isOpen: boolean;
}

const Card = styled.div<CardProps>`
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 100%; /* Ensures the card takes up available width */
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
        max-width: 100%;
        padding: 15px;
    }
`;

interface ExpandableCardProps {
    title: string;
    text: string;
    list?: string[];
    isOpen: boolean;
    onToggle: () => void;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, text, list, isOpen, onToggle }) => (
    <Card isOpen={isOpen} onClick={onToggle}>
        <h2>{title}</h2>
        <Text>{text}</Text>
        {list && isOpen && (
            <List>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </List>
        )}
    </Card>
);

const contentSections = [
    {
        title: 'What is CBD?',
        text: `CBD, short for Cannabidiol, is a naturally occurring compound found in the cannabis plant. Unlike THC, 
               CBD does not have psychoactive effects, meaning it won't get you "high." It’s often used for its potential 
               health benefits, including relief from anxiety, pain, inflammation, and more.`
    },
    {
        title: 'Potential Benefits of CBD',
        text: `Research into the benefits of CBD is still ongoing, but users have reported various positive effects. 
               Some potential benefits include:`,
        list: [
            'Reduction in anxiety and stress',
            'Relief from chronic pain and inflammation',
            'Support for sleep disorders and insomnia',
            'Improved focus and relaxation'
        ]
    },
    {
        title: 'How to Use CBD',
        text: `CBD can be consumed in many forms, including oils, tinctures, edibles, capsules, topicals, and even 
               beverages. The method you choose will depend on your personal preferences and the type of relief you're 
               seeking.`
    },
    {
        title: 'Is CBD Legal?',
        text: `The legal status of CBD varies by country and state. In many places, CBD products derived from hemp with 
               less than 0.3% THC are legal. It’s important to research your local laws to ensure you're using CBD 
               products legally.`
    }
];

const products = [
    { name: 'CBD Oil', description: 'Premium CBD oil for everyday wellness.', path: '/products/cbd-oil' },
    {
        name: 'CBD Gummies',
        description: 'Delicious CBD-infused gummies for relaxation.',
        path: '/products/cbd-gummies'
    },
    {
        name: 'CBD Cream',
        description: 'Topical cream for localized pain relief and inflammation.',
        path: '/products/cbd-cream'
    }
];

const Dispensary = () => {
    const navigate = useNavigate();
    const [openCardIndices, setOpenCardIndices] = useState<number[]>([0]); // Open the first card by default

    const handleCardClick = (path: string) => {
        navigate(path); // Navigates to the specified path
    };

    const toggleCard = (index: number) => {
        setOpenCardIndices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };

    return (
        <Container>
            <Header>Welcome to Our CBD Information Page!</Header>

            {contentSections.map((section, index) => (
                <ExpandableCard
                    key={index}
                    title={section.title}
                    text={section.text}
                    list={section.list}
                    isOpen={openCardIndices.includes(index)}
                    onToggle={() => toggleCard(index)}
                />
            ))}

            <Button onClick={() => handleCardClick('/contact')}>Contact Us to Learn More</Button>

            <SubHeader>Our CBD Products</SubHeader>
            <Text>Explore our selection of high-quality CBD products designed to fit your needs:</Text>
            <CardContainer>
                {products.map((product, index) => (
                    <Card key={index} onClick={() => handleCardClick(product.path)} isOpen={false}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </Card>
                ))}
            </CardContainer>

            <Button onClick={() => navigate('/products')}>View All Products</Button>
        </Container>
    );
};

export default Dispensary;
