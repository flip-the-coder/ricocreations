import React from 'react';
import { useIntl } from 'react-intl';
import { RegisterFormLayout } from './LoginLayout';
import { Title } from './LoginPage.styled';
import UserRegistrationWithTokenForm from './UserRegistrationWithTokenForm';

const UserRegistrationWithTokenPage: React.FC = () => {
    const node = React.useRef<HTMLDivElement>(null);
    const intl = useIntl();

    return (
        <div ref={node}>
            <RegisterFormLayout>
                <Title>{intl.formatMessage({ id: 'RegisterPage.title' })}</Title>
                <UserRegistrationWithTokenForm node={node} />
            </RegisterFormLayout>
        </div>
    );
};

export default UserRegistrationWithTokenPage;
