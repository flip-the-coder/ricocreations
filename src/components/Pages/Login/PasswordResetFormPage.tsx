import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import userApi from '../../api/userApi';
import { Button } from '../shared/Button.styled';
import { LoginFormLayout } from './LoginLayout';
import { ButtonContainer, ErrorContainer, SubTitle, Title } from './LoginPage.styled';
import { Error } from '../../models/Error';
import PasswordFormField from '../FormFields/PasswordFormField/PasswordFormField';

const PASSWORD_VALIDATION_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

interface PasswordResetFormValues {
    password: string;
    confirmPassword: string;
}

const initialValues: PasswordResetFormValues = { password: '', confirmPassword: '' };

const PasswordResetForm = (props: { setIsFormSent: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const intl = useIntl();
    let { userId, token } = useParams<{ userId: string; token: string }>();
    const [serverErrors, setServerErrors] = React.useState<string[]>([]);

    const validationSchema = yup.object({
        password: yup
            .string()
            .required(intl.formatMessage({ id: 'form.password.required.message' }))
            .min(8, intl.formatMessage({ id: 'form.password.min.message' }))
            .matches(PASSWORD_VALIDATION_REGEX, intl.formatMessage({ id: 'form.password.matches.message' })),
        confirmPassword: yup
            .string()
            .required(intl.formatMessage({ id: 'RegisterForm.confirmPassword.required.message' }))
            .oneOf([yup.ref('password')], intl.formatMessage({ id: 'RegisterForm.confirmPassword.match.message' }))
    });

    async function onSubmit(data: PasswordResetFormValues, formikHelpers: FormikHelpers<PasswordResetFormValues>) {
        formikHelpers.setSubmitting(true);
        try {
            userId &&
                token &&
                (await userApi.account.resetPassword(userId, token, data.password, data.confirmPassword));
            props.setIsFormSent(true);
        } catch (error) {
            const errors = error as Error;
            if (errors.response) {
                setServerErrors(Object.values(errors.response.data.ModelState)[0] as string[]);
            }
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <React.Fragment>
            <Title>{intl.formatMessage({ id: 'PasswordResetFormPage.title' })}</Title>
            <SubTitle>{intl.formatMessage({ id: 'PasswordResetFormPage.subtitle' })}</SubTitle>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        {serverErrors.length > 0 && (
                            <ErrorContainer>
                                {serverErrors.map((errorMessage: string, index: number) => (
                                    <p key={index}>
                                        {errorMessage}
                                        {errorMessage === 'Invalid token.' && (
                                            <Link to={'/requestpasswordreset'}>
                                                {intl.formatMessage({ id: 'LoginPage.navigation.passwordReset' })}
                                            </Link>
                                        )}
                                    </p>
                                ))}
                            </ErrorContainer>
                        )}
                        <PasswordFormField
                            name="password"
                            label={intl.formatMessage({ id: 'form.password.label' })}
                            hint={intl.formatMessage({ id: 'form.password.required.hint' })}
                        />
                        <PasswordFormField
                            name="confirmPassword"
                            label={intl.formatMessage({ id: 'RegisterForm.confirmPassword.label' })}
                        />
                        <ButtonContainer>
                            <Button primary disabled={isSubmitting} type="submit">
                                {intl.formatMessage({ id: 'PasswordResetPage.button.saveNewPassword' })}
                            </Button>
                        </ButtonContainer>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};

const PasswordResetFormSuccessMessage = () => {
    const intl = useIntl();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Title>{intl.formatMessage({ id: 'PasswordResetFormSuccessMessage.title' })}</Title>
            <SuccessMessage>{intl.formatMessage({ id: 'PasswordResetFormSuccessMessage.p' })}</SuccessMessage>
            <ButtonContainer>
                <Button primary type="button" onClick={() => navigate('/login')}>
                    {intl.formatMessage({ id: 'LoginPage.button.submit' })}
                </Button>
            </ButtonContainer>
        </React.Fragment>
    );
};

const PasswordResetFormPage = () => {
    const [isFormSent, setIsFormSent] = React.useState(false);

    return (
        <LoginFormLayout>
            {isFormSent ? <PasswordResetFormSuccessMessage /> : <PasswordResetForm setIsFormSent={setIsFormSent} />}
        </LoginFormLayout>
    );
};

export default PasswordResetFormPage;

const SuccessMessage = styled.p`
    font-size: 16px;
    text-align: center;
    margin: 0 5% 10%;
    line-height: 1.4;
    letter-spacing: 0.1px;
`;
