import styled from 'styled-components';

// Styled components
const FormContainer = styled.div`
    max-width: 90%;
    margin: 0 auto;
    padding: 15px;
    background-color: #fdb3ba;
`;

const Heading = styled.h2`
    text-align: center;
    margin: 10px 0;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    margin-bottom: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ff69b4; /* Pink background for the button */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
`;

const Error = styled.div`
    color: #ff69b4; /* Pink color for error messages */
    font-size: 0.9em;
    margin-top: -5px;
    margin-bottom: 10px;
`;

const ContactUsFormStyles = {
    FormContainer,
    Heading,
    Input,
    TextArea,
    Button,
    Error
};

export default ContactUsFormStyles;
