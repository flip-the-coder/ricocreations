import React from 'react';
import { useIntl } from 'react-intl';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import userApi from '../../../api/userApi';
import { Button } from '../../shared/Button.styled';
import { LoginFormLayout } from './LoginLayout';
import { ErrorContainer, Title } from './LoginPage.styled';
import { Error } from '../../../models/Error';

interface LocationState {
    email: string;
}

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const intl = useIntl();
    const [serverErrors, setServerErrors] = React.useState<string[]>([]);
    const { email } = location.state as LocationState;

    const resendEmailConfirmation = async () => {
        if (email) {
            try {
                await userApi.account.resendEmailConfirmation(email);
            } catch (error) {
                const errors = error as Error;
                if (errors.response) {
                    if (errors.response.data.ModelState) {
                        setServerErrors(Object.values(errors.response.data.ModelState)[0] as string[]);
                    } else {
                        setServerErrors([errors.response.data.Message]);
                    }
                } else {
                    console.error(errors);
                }
            }
        }
    };

    if (!location.state) {
        return <Navigate to={'/login'} replace />;
    }

    return (
        <LoginFormLayout>
            <Title>{intl.formatMessage({ id: 'VerifyEmailPage.title' })}</Title>
            {serverErrors.length > 0 && (
                <ErrorContainer>
                    {serverErrors.map((errorMessage: string, index: number) => (
                        <p key={index}>{errorMessage}</p>
                    ))}
                </ErrorContainer>
            )}
            <p>{intl.formatMessage({ id: 'VerifyEmailPage.p1' }, { email: <strong>{email}</strong> })}</p>
            <p>{intl.formatMessage({ id: 'VerifyEmailPage.p2' })}</p>
            <div style={{ margin: '20px 0' }}>
                <Button onClick={() => navigate('/login')}>
                    {intl.formatMessage({ id: 'LoginPage.navigation.backToLogin' })}
                </Button>
            </div>
            <HintContainer>
                <p>{intl.formatMessage({ id: 'VerifyEmailPage.hint.p1' })}</p>
                <p>
                    {intl.formatMessage({ id: 'VerifyEmailPage.hint.p2' })}
                    <button onClick={resendEmailConfirmation}>
                        {intl.formatMessage({ id: 'VerifyEmailPage.hint.resend' })}
                    </button>
                </p>
            </HintContainer>
        </LoginFormLayout>
    );
};

export default VerifyEmailPage;

const HintContainer = styled.div`
    padding: 25px 20px;
    background-color: ${(props) => props.theme.colors.neutrals[2]};
    p {
        text-align: center;
        line-height: 1.7;
    }
    p:first-of-type {
        font-weight: bold;
    }
    button {
        background: none !important;
        border: none;
        padding: 0 !important;
        font-family: ${(props) => props.theme.typography.fontFamily};
        text-decoration: underline;
        cursor: pointer;
        transition: color 0.2s ease-in-out;
        &:hover {
            color: ${(props) => props.theme.colors.primary};
        }
    }
`;
