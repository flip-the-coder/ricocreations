import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { LoginFormLayout } from './LoginLayout';
import { ParagraphContainer, RegisterContainer } from './LoginPage.styled';
import RequestPasswordResetForm from './RequestPasswordResetForm';

const RequestPasswordResetFormSentMessage = () => {
    const intl = useIntl();

    return (
        <ParagraphContainer>
            <p>{intl.formatMessage({ id: 'PasswordResetPage.FormSentMessage.p1' })}</p>
            <p>
                <strong>{intl.formatMessage({ id: 'PasswordResetPage.FormSentMessage.p2.strong' })} </strong>
                {intl.formatMessage({ id: 'PasswordResetPage.FormSentMessage.p2.message' })}
            </p>
        </ParagraphContainer>
    );
};

const RequestPasswordResetFormDispatcher = ({ isFormSent, setIsFormSent }) => {
    if (isFormSent) {
        return <RequestPasswordResetFormSentMessage />;
    }
    return <RequestPasswordResetForm setIsFormSent={setIsFormSent} />;
};

const RequestPasswordResetPage = () => {
    const [isFormSent, setIsFormSent] = React.useState(false);
    const intl = useIntl();

    return (
        <LoginFormLayout>
            <RequestPasswordResetFormDispatcher isFormSent={isFormSent} setIsFormSent={setIsFormSent} />
            <RegisterContainer>
                <Link to={'/login'}>{intl.formatMessage({ id: 'LoginPage.navigation.backToLogin' })}</Link>
            </RegisterContainer>
        </LoginFormLayout>
    );
};

export default RequestPasswordResetPage;
