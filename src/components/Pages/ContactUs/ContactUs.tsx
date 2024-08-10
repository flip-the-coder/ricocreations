import React from 'react';
import styled from 'styled-components';

// Define styled components
const Row = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fdb3ba;
    margin: 20px 0;
    padding: 40px 0;
`;

const Column = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin: 5px 0;
    padding: 5px 0;
`;

const FullWidthColumn = styled.div`
    width: 100%;
    padding-bottom: 50px;
`;

const CustomHeading = styled.h3`
    text-align: center;
    font-weight: 600;
`;

const FormContainer = styled.div`
    max-width: 80%;
    margin: 0 auto;
`;

const Separator = styled.hr`
    border: 0;
    border-top: 1px solid #ccc;
    margin: 20px 0;
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.2em;
    text-align: center;
`;

const SocialLink = styled.a`
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
`;

// Placeholder for form and social links
const Form = () => (
    <form>
        <label>
            Name
            <input type="text" placeholder="Name" />
        </label>
        <label>
            Email
            <input type="email" placeholder="Email" />
        </label>
        <label>
            Phone
            <input type="text" placeholder="Phone" />
        </label>
        <label>
            Availability
            <input type="date" placeholder="Please select your availability so we can call back you." />
        </label>
        <label>
            Reason for consultation
            <textarea placeholder="Reason for consultation" />
        </label>
        <label>
            Captcha
            <input type="text" placeholder="Captcha" />
        </label>
        <button type="submit">Submit</button>
    </form>
);

const ContactUs = () => {
    return (
        <div>
            <Row>
                <Column>
                    <Heading>Contact us</Heading>
                </Column>
            </Row>
            <FullWidthColumn>
                <CustomHeading>Request Expert CBD Consultation</CustomHeading>
            </FullWidthColumn>
            <Row>
                <FormContainer>
                    <Form />
                </FormContainer>
            </Row>
            <Separator />
            <SocialLinks>
                <SocialLink href="https://www.instagram.com/ricocreations/" target="_blank" rel="noopener noreferrer">
                    Instagram
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                    TikTok
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                    YouTube
                </SocialLink>
            </SocialLinks>
            <Row>
                <Column></Column>
            </Row>
        </div>
    );
};

export default ContactUs;
