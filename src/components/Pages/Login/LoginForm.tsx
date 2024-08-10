import { Formik, Form, FormikHelpers } from 'formik';
import React from 'react';
import TextFormField from '../../UI/FormFields/TextFormField';
import * as yup from 'yup';
import { Button } from '../../shared/Button.styled';
import { ButtonContainer, ErrorContainer } from './LoginPage.styled';
import { useStores } from '../../../hooks/useStores';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useIntl } from 'react-intl';

interface LoginFormValues {
    email: string;
    password: string;
}

const initialValues: LoginFormValues = { email: '', password: '' };

interface Props {
    noRedirect?: boolean;
}

export const LoginForm: React.FC<Props> = (props) => {
    const intl = useIntl();
    const { authStore } = useStores();
    let navigate = useNavigate();
    let location = useLocation();

    let { from } = (location.state as { from: { pathname: string } }) || {
        from: { pathname: '/model-homes' }
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .email()
            .required(intl.formatMessage({ id: 'form.email.required.message' })),
        password: yup.string().required(intl.formatMessage({ id: 'form.password.required.message' }))
    });

    const redirectToUserAgreement = (data: LoginFormValues) => {
        const stateData = { state: { email: data.email, password: data.password } };
        navigate('/useragreement', stateData);
    };

    const redirectToResendRegistrationEmail = (data: LoginFormValues) => {
        navigate('/verifyEmail', { state: { email: data.email, password: data.password } });
    };

    async function onSubmit(data: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) {
        formikHelpers.setSubmitting(true);
        const isLoggedIn = await authStore.login(data.email, data.password);

        if (isLoggedIn) {
            if (!props.noRedirect) navigate(from, { replace: true });
        } else {
            if (authStore.error && authStore.error === 'user_agreement_not_accepted') {
                redirectToUserAgreement(data);
            }
            if (authStore.error && authStore.error === 'email_unconfirmed') {
                redirectToResendRegistrationEmail(data);
            }
        }
        formikHelpers.setSubmitting(false);
    }

    React.useEffect(() => {
        return function cleanup() {
            authStore.error = '';
        };
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    {authStore.error && <ErrorContainer>{intl.formatMessage({ id: authStore.error })}</ErrorContainer>}
                    <TextFormField name="email" type="email" autoComplete="on" label="Email*" />
                    <TextFormField name="password" type="password" autoComplete="on" label="Password*" />
                    <ButtonContainer>
                        <Button primary disabled={isSubmitting} type="submit">
                            {intl.formatMessage({ id: 'LoginPage.button.submit' })}
                        </Button>
                    </ButtonContainer>
                </Form>
            )}
        </Formik>
    );
};

export default observer(LoginForm);
