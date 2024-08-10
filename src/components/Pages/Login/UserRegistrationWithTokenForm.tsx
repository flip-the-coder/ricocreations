import { Formik, Form, FormikHelpers } from 'formik';
import React, { useState, useCallback, useEffect, RefObject } from 'react';
import TextFormField from '../../UI/FormFields/TextFormField';
import * as yup from 'yup';
import { Button } from '../../shared/Button.styled';
import { ButtonContainer } from './LoginPage.styled';
import { observer } from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import userApi, { UserRegistrationWithTokenModel } from '../../../api/userApi';
import styled from 'styled-components';
import { handleError } from '../../../utils/ErrorUtils';
import useNotification from '../../../hooks/useNotification';

// Regex for password validation
const PASSWORD_VALIDATION_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

// Define the interface for form values
interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    userAgreementSignedInitials: string;
    userAgreement: string;
}

const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    userAgreementSignedInitials: '',
    userAgreement: ''
};

export const UserRegistrationWithTokenForm: React.FC<{ node: RefObject<HTMLDivElement> }> = ({ node }) => {
    const params = useParams<{ token: string }>();
    const [globalUserAgreement, setGlobalUserAgreement] = useState<string | undefined>();
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const intl = useIntl();
    const { addNotification } = useNotification();

    const validationSchema = yup.object({
        firstName: yup.string().required(intl.formatMessage({ id: 'RegisterForm.firstName.required.message' })),
        lastName: yup.string().required(intl.formatMessage({ id: 'RegisterForm.lastName.required.message' })),
        email: yup
            .string()
            .email()
            .required(intl.formatMessage({ id: 'form.email.required.message' })),
        confirmEmail: yup
            .string()
            .email()
            .required(intl.formatMessage({ id: 'RegisterForm.confirmEmail.required.message' }))
            .oneOf([yup.ref('email')], intl.formatMessage({ id: 'RegisterForm.confirmEmail.match.message' })),
        password: yup
            .string()
            .required(intl.formatMessage({ id: 'form.password.required.message' }))
            .min(8, intl.formatMessage({ id: 'form.password.min.message' }))
            .matches(PASSWORD_VALIDATION_REGEX, intl.formatMessage({ id: 'form.password.matches.message' })),
        confirmPassword: yup
            .string()
            .required(intl.formatMessage({ id: 'RegisterForm.confirmPassword.required.message' }))
            .oneOf([yup.ref('password')], intl.formatMessage({ id: 'RegisterForm.confirmPassword.match.message' })),
        userAgreementSignedInitials: yup
            .string()
            .required(intl.formatMessage({ id: 'RegisterForm.userAgreementSignedInitials.required.message' })),
        userAgreement: yup.string().notRequired()
    });

    const validateToken = useCallback(async () => {
        try {
            if (params.token) {
                const res = await userApi.userRegistrationToken.validateToken(params.token);
                if (res.status !== 200) {
                    addNotification(intl.formatMessage({ id: 'notification.message.success.error' }), 'error');
                    navigate('/login');
                }
            }
        } catch (error) {
            addNotification(intl.formatMessage({ id: 'notification.message.success.error' }), 'error');
            navigate('/login');
        }
    }, [params.token, addNotification, intl, navigate]);

    const fetchGlobalUserAgreements = useCallback(async () => {
        try {
            const res = await userApi.account.getUserAgreement();
            setGlobalUserAgreement(res.data);
        } catch (error) {
            setError(handleError(error));
        }
    }, []);

    useEffect(() => {
        validateToken();
        fetchGlobalUserAgreements();
    }, [validateToken, fetchGlobalUserAgreements]);

    useEffect(() => {
        if (error && node.current) {
            node.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [error, node]);

    if (!globalUserAgreement) return null;

    async function onSubmit(data: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues>) {
        formikHelpers.setSubmitting(true);
        const { userAgreement, ...registerModel } = data;
        try {
            if (params.token) {
                await userApi.account.registerToken(registerModel, params.token);
                navigate('/model-homes');
            }
        } catch (error) {
            setError(handleError(error));
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    {/* {error && (
                        <section>
                            <ErrorList errors={[error]} />
                        </section>
                    )} */}
                    <TextFormField
                        name="firstName"
                        type="text"
                        label={intl.formatMessage({ id: 'RegisterForm.firstName.label' })}
                    />
                    <TextFormField
                        name="lastName"
                        type="text"
                        label={intl.formatMessage({ id: 'RegisterForm.lastName.label' })}
                    />
                    <TextFormField name="email" type="email" label={intl.formatMessage({ id: 'form.email.label' })} />
                    <TextFormField
                        name="confirmEmail"
                        type="email"
                        label={intl.formatMessage({ id: 'RegisterForm.confirmEmail.label' })}
                    />
                    <TextFormField
                        name="password"
                        type="password"
                        label={intl.formatMessage({ id: 'form.password.label' })}
                        hint={intl.formatMessage({ id: 'form.password.required.hint' })}
                    />
                    <TextFormField
                        name="confirmPassword"
                        type="password"
                        label={intl.formatMessage({ id: 'RegisterForm.confirmPassword.label' })}
                    />
                    <UserAgreementContainer>
                        <TextFormField
                            name="userAgreement"
                            type="text"
                            label={intl.formatMessage({ id: 'RegisterForm.userAgreement.label' })}
                            isTextArea={true}
                            disabled={true}
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
                        <Button
                            disabled={isSubmitting}
                            type="button"
                            onClick={() => navigate('/login')}
                            className="btn-cancel"
                            noRaise
                        >
                            {intl.formatMessage({ id: 'RegisterForm.button.cancel' })}
                        </Button>
                        <Button primary disabled={isSubmitting} type="submit">
                            {intl.formatMessage({ id: 'RegisterForm.button.next' })}
                        </Button>
                    </ButtonContainer>
                </Form>
            )}
        </Formik>
    );
};

export default observer(UserRegistrationWithTokenForm);

const UserAgreementContainer = styled.div`
    textarea {
        height: 175px;
        line-height: 1.3;
        resize: none;
        outline: none;
        text-decoration: none solid rgb(71, 71, 71);
    }
`;
