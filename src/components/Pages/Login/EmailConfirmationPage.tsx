import React from 'react';
import { useIntl } from 'react-intl';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import userApi from '../../../api/userApi';
import Spinner from '../../Spinner';
import { LoginFormLayout } from './LoginLayout';
import { ErrorContainer } from './LoginPage.styled';
import { Error } from '../../../models/Error';

const EmailConfirmationPage = () => {
    const intl = useIntl();
    const { userId, token } = useParams<{ userId: string; token: string }>();
    const [isEmailConfirmed, setIsEmailConfirmed] = React.useState(false);
    const [serverErrors, setServerErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        async function confirmEmail() {
            try {
                userId && token && (await userApi.account.verifyEmail(userId, token));
                setIsEmailConfirmed(true);
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
                setIsEmailConfirmed(false);
            }
        }
        confirmEmail();
    }, [userId, token]);

    if (isEmailConfirmed) {
        return <Navigate to={'/login'} replace />;
    }

    if (serverErrors.length > 0) {
        return (
            <LoginFormLayout>
                <ErrorContainer>
                    {serverErrors.map((errorMessage: string, index: number) => (
                        <p key={index}>{errorMessage}</p>
                    ))}
                </ErrorContainer>
            </LoginFormLayout>
        );
    }

    return (
        <LoginFormLayout>
            <Spinner size={'50px'} />
            <Message>{intl.formatMessage({ id: 'EmailConfirmationPage.message' })}</Message>
        </LoginFormLayout>
    );
};

export default EmailConfirmationPage;

const Message = styled.p`
    color: ${(props) => props.theme.colors.neutrals[4]};
    font-size: 25px;
    height: 30px;
    text-align: center;
`;
