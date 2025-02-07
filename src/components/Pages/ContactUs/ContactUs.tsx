import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ContactUsFormStyles from './ContactUs.style';
import flipTheCoders from '../../../api/flipTheCoders';

const { FormContainer, Heading, Input, TextArea, Button, Error } = ContactUsFormStyles;

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    availability: Yup.date().required('Availability is required'),
    reason: Yup.string().required('Reason for consultation is required')
});

// Reusable Form Field Component
interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    as?: typeof Input | typeof TextArea; // Allow Input or TextArea
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', as: Component = Input }) => (
    <label>
        {label}
        <Field as={Component} type={type} name={name} autoComplete="off" />
        <ErrorMessage name={name} component={Error} />
    </label>
);

const ContactUs = () => {
    const onSubmit = async (values: {
        name: string;
        email: string;
        phone: string;
        availability: string;
        reason: string;
    }) => {
        console.log(values);

        try {
            const data = (await flipTheCoders.flipTheCoders.contactUs(values)).data;
            console.log(data);
        } catch (e) {
        } finally {
        }
    };

    return (
        <FormContainer>
            <Heading>Contact Us</Heading>
            <Formik
                initialValues={{ name: '', email: '', phone: '', availability: '', reason: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormField label="Name" name="name" />
                        <FormField label="Email" name="email" type="email" />
                        <FormField label="Phone" name="phone" />
                        <FormField label="Availability" name="availability" type="date" />
                        <FormField label="Reason for consultation" name="reason" as={TextArea} />
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default ContactUs;
