import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DispensaryStyles } from './Dispensary.style';
import useExpandableCards from '../../../hooks/useExpandableCards';

interface ExpandableCardProps {
    title: string;
    text: string;
    list?: string[];
    isOpen: boolean;
    onToggle: () => void;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, text, list, isOpen, onToggle }) => {
    const { Card, Text, List } = DispensaryStyles;

    return (
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
};

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
    const { Container, Header, Button, SubHeader, Text, CardContainer, Card } = DispensaryStyles;
    const { openCardIndices, toggleCard } = useExpandableCards([0]); // Open the first card by default

    const handleCardClick = (path: string) => {
        navigate(path); // Navigates to the specified path
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
