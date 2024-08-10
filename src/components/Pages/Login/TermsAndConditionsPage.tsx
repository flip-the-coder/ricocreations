import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import userApi from '../../../api/userApi';
import TextFormField from '../../UI/FormFields/TextFormField';
import { Button } from '../../shared/Button.styled';
import { RegisterFormLayout } from './LoginLayout';
import { ButtonContainer, ErrorContainer, SubTitle, Title } from './LoginPage.styled';
import { Error } from '../../../models/Error';

interface TermsAndConditionsFormValues {
    userAgreementSignedInitials: string;
    userAgreement: string;
}

const initialValues: TermsAndConditionsFormValues = {
    userAgreementSignedInitials: '',
    userAgreement: ''
};

interface LocationState {
    email: string;
    password: string;
}

const TermsAndConditionsPage = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const location = useLocation();
    const [userAgreement, setUserAgreement] = React.useState<string>();
    const [serverErrors, setServerErrors] = React.useState<string[]>([]);
    const { email, password } = location.state as LocationState;

    const validationSchema = yup.object({
        userAgreementSignedInitials: yup
            .string()
            .required(intl.formatMessage({ id: 'RegisterForm.userAgreementSignedInitials.required.message' })),
        userAgreement: yup.string().notRequired()
    });

    async function onSubmit(
        data: TermsAndConditionsFormValues,
        formikHelpers: FormikHelpers<TermsAndConditionsFormValues>
    ) {
        formikHelpers.setSubmitting(true);
        try {
            await userApi.account.acceptTermsAndConditions(email, password, data.userAgreementSignedInitials);
            navigate('/login');
        } catch (error) {
            const errors = error as Error;
            if (errors.response) {
                if (errors.response.data.ModelState) {
                    setServerErrors(Object.values(errors.response.data.ModelState)[0] as string[]);
                } else {
                    setServerErrors([errors.response.data.Message]);
                }
            }
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }

    React.useEffect(() => {
        async function fetchUserAgreement() {
            try {
                const response = await userApi.account.getTermsAndConditions();
                initialValues.userAgreement = response.data;
                setUserAgreement(response.data);
            } catch (error) {
                const errors = error as Error;
                if (errors.response) {
                    if (errors.response.data.ModelState) {
                        setServerErrors(Object.values(errors.response.data.ModelState)[0] as string[]);
                    } else {
                        setServerErrors([errors.response.data.Message]);
                    }
                }
            }
        }
        fetchUserAgreement();
    });

    if (!userAgreement) return null;

    return (
        <RegisterFormLayout width={'70%'}>
            <Title>{intl.formatMessage({ id: 'TermsAndConditionsPage.title' })}</Title>
            <SubTitle>{intl.formatMessage({ id: 'TermsAndConditionsPage.subtitle' })}</SubTitle>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, dirty }) => (
                    <Form>
                        {serverErrors.length > 0 && (
                            <ErrorContainer>
                                {serverErrors.map((errorMessage: string, index: number) => (
                                    <p key={index}>{errorMessage}</p>
                                ))}
                            </ErrorContainer>
                        )}
                        <UserAgreementContainer>
                            <TextFormField
                                name="userAgreement"
                                type="text"
                                label={intl.formatMessage({ id: 'TermsAndConditionsPage.userAgreement.label' })}
                                isTextArea={true}
                                disabled
                            />
                        </UserAgreementContainer>
                        <div style={{ width: '25%' }}>
                            <TextFormField
                                name="userAgreementSignedInitials"
                                type="text"
                                label={intl.formatMessage({ id: 'RegisterForm.userAgreementSignedInitials.label' })}
                            />
                        </div>
                        <ButtonContainer>
                            <Button primary disabled={isSubmitting || !dirty} type="submit">
                                {intl.formatMessage({ id: 'RegisterForm.button.next' })}
                            </Button>
                        </ButtonContainer>
                    </Form>
                )}
            </Formik>
        </RegisterFormLayout>
    );
};

export default TermsAndConditionsPage;

const UserAgreementContainer = styled.div`
    textarea {
        height: 30vh;
        line-height: 1.3;
        resize: none;
        outline: none;
        text-decoration: none solid rgb(71, 71, 71);
    }
`;
