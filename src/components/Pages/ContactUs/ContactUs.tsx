import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    availability: Yup.date().required('Availability is required'),
    reason: Yup.string().required('Reason for consultation is required'),
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
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form data', values);
        }
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
                {formik.touched.name && formik.errors.name && <Error>{formik.errors.name}</Error>}
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
                {formik.touched.email && formik.errors.email && <Error>{formik.errors.email}</Error>}
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
                {formik.touched.phone && formik.errors.phone && <Error>{formik.errors.phone}</Error>}
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
                {formik.touched.availability && formik.errors.availability && (
                    <Error>{formik.errors.availability}</Error>
                )}
            </label>
            <label>
                Reason for consultation
                <TextArea
                    name="reason"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reason}
                />
                {formik.touched.reason && formik.errors.reason && <Error>{formik.errors.reason}</Error>}
            </label>
            <Button type="submit">Submit</Button>
        </form>
    );
};

const ContactUs = () => {
    return (
        <FormContainer>
            <Heading>Contact Us</Heading>
            <Form />
        </FormContainer>
    );
};

export default ContactUs;
