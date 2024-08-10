import React from 'react';
import { useIntl } from 'react-intl';
import { RegisterFormLayout } from './LoginLayout';
import { Title } from './LoginPage.styled';
import RegisterForm from './RegisterForm';

const RegisterPage: React.FC = () => {
    const intl = useIntl();
    const node = React.useRef<HTMLDivElement>(null);

    return (
        <div ref={node}>
            <RegisterFormLayout>
                <Title>{intl.formatMessage({ id: 'RegisterPage.title' })}</Title>
                <RegisterForm node={node} />
            </RegisterFormLayout>
        </div>
    );
};

export default RegisterPage;
