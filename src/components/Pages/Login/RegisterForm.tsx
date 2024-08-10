import { Formik, Form, FormikHelpers } from 'formik';
import React from 'react';
import TextFormField from '../FormFields/TextFormField';
import * as yup from 'yup';
import { Button } from '../shared/Button.styled';
import { ButtonContainer, ErrorContainer } from './LoginPage.styled';
import { observer } from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import userApi, { RegisterModel } from '../../api/userApi';
import styled from 'styled-components';
import { Error } from '../../models/Error';
import Environment from '../../Environment';

const PASSWORD_VALIDATION_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

interface RegisterFormValues extends RegisterModel {
    userAgreement: string;
    email: string;
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

export const RegisterForm: React.FC<{ node: React.RefObject<HTMLDivElement> }> = ({ node }) => {
    const [globalUserAgreement, setGlobalUserAgreement] = React.useState<string>();
    const [serverErrors, setServerErrors] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const intl = useIntl();

    const validationSchema = yup.object({
        firstName: yup.string().required(intl.formatMessage({ id: 'RegisterForm.firstName.required.message' })),
        lastName: yup.string().required(intl.formatMessage({ id: 'RegisterForm.lastName.required.message' })),
        email: yup
            .string()
            .email(intl.formatMessage({ id: 'form.email.invalid.message' }))
            .required(intl.formatMessage({ id: 'form.email.required.message' })),
        confirmEmail: yup
            .string()
            .email(intl.formatMessage({ id: 'RegisterForm.confirmEmail.invalid.message' }))
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

    async function onSubmit(data: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues>) {
        formikHelpers.setSubmitting(true);
        const { userAgreement, ...registerModel } = data;
        try {
            await userApi.account.register(registerModel);
            navigate('/verifyemail');
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
        const fetchGlobalUserAgreements = async () => {
            try {
                const res = await userApi.account.getUserAgreement();
                setGlobalUserAgreement(res.data);
            } catch (error) {
                console.error('Failed to fetch global user agreements:', error);
            }
        };
        fetchGlobalUserAgreements();
    }, []);

    React.useEffect(() => {
        if (serverErrors.length > 0 && node && node.current) {
            node.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [serverErrors, node]);

    if (!globalUserAgreement) return null;

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    {serverErrors.length > 0 && (
                        <ErrorContainer>
                            {serverErrors.map((errorMessage: string, index: number) => (
                                <p key={index}>{errorMessage}</p>
                            ))}
                        </ErrorContainer>
                    )}
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

export default observer(RegisterForm);

const UserAgreementContainer = styled.div`
    textarea {
        height: 175px;
        line-height: 1.3;
        resize: none;
        outline: none;
        text-decoration: none solid rgb(71, 71, 71);
    }
`;
