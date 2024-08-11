import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { LoginFormLayout } from './LoginLayout';
import { Account, RegisterContainer, Title } from './LoginPage.styled';

const LoginPage: React.FC = () => {
    const intl = useIntl();

    return (
        <LoginFormLayout>
            <Title>{intl.formatMessage({ id: 'LoginPage.title' })}</Title>
            <LoginForm />
            <RegisterContainer>
                <Account>{intl.formatMessage({ id: 'LoginPage.needAnAccount' })}</Account>
                <Link to={'/register'}>{intl.formatMessage({ id: 'LoginPage.navigation.register' })}</Link>
            </RegisterContainer>
            <RegisterContainer>
                <Account>{intl.formatMessage({ id: 'LoginPage.forgetYourPassword' })}</Account>
                <Link to={'/requestpasswordreset'}>
                    {intl.formatMessage({ id: 'LoginPage.navigation.passwordReset' })}
                </Link>
            </RegisterContainer>
        </LoginFormLayout>
    );
};

export default LoginPage;
