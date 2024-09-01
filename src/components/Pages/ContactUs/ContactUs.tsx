import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Define styled components (keeping your existing styles)
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
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Error = styled.div`
    color: red;
    margin-bottom: 10px;
`;

// Define the validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    availability: Yup.date().required('Availability is required'),
    reason: Yup.string().required('Reason for consultation is required'),
    captcha: Yup.string().required('Captcha is required'),
});

// Form component using Formik
const Form = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            availability: '',
            reason: '',
            captcha: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log('Form data', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                Name
                <Input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <Error>{formik.errors.name}</Error> : null}
            </label>
            <label>
                Email
                <Input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <Error>{formik.errors.email}</Error> : null}
            </label>
            <label>
                Phone
                <Input
                    type="text"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? <Error>{formik.errors.phone}</Error> : null}
            </label>
            <label>
                Availability
                <Input
                    type="date"
                    name="availability"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.availability}
                />
                {formik.touched.availability && formik.errors.availability ? <Error>{formik.errors.availability}</Error> : null}
            </label>
            <label>
                Reason for consultation
                <TextArea
                    name="reason"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reason}
                />
                {formik.touched.reason && formik.errors.reason ? <Error>{formik.errors.reason}</Error> : null}
            </label>
            <label>
                Captcha
                <Input
                    type="text"
                    name="captcha"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.captcha}
                />
                {formik.touched.captcha && formik.errors.captcha ? <Error>{formik.errors.captcha}</Error> : null}
            </label>
            <Button type="submit">Submit</Button>
        </form>
    );
};

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
                <CustomHeading>Get with Jessica so that we can set up the SMS messaging - I need company info for AWS</CustomHeading>
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
