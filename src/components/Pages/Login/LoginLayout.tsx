import React from 'react';
import styled from 'styled-components';
import { useStores } from '../../../hooks/useStores';
import { LoginWrapper, LoginFormWrapper, LoginContainer } from './LoginPage.styled';

export const LoginFormLayout = ({ children }) => {
    const { themeStore } = useStores();

    return (
        <LoginFormWrapper>
            <LoginContainer>
                <BrandImageContainer>
                    <BrandImage imageSource={themeStore.theme.myHomesBrand} />
                </BrandImageContainer>
                {children}
            </LoginContainer>
        </LoginFormWrapper>
    );
};

export const RegisterFormLayout = ({ children, width = '700px' }) => {
    const { themeStore } = useStores();

    return (
        <RegisterFormWrapper>
            <RegisterContainer width={width}>
                <BrandImageContainer>
                    <BrandImage imageSource={themeStore.theme.myHomesBrand} />
                </BrandImageContainer>
                {children}
            </RegisterContainer>
        </RegisterFormWrapper>
    );
};

const LoginLayout = ({ children }) => {
    return <LoginWrapper>{children}</LoginWrapper>;
};

export default LoginLayout;

const RegisterFormWrapper = styled(LoginFormWrapper)`
    height: auto;
`;

const RegisterContainer = styled(LoginContainer)<{ width?: string }>`
    width: ${({ width }) => width};

    @media (max-width: 575px) {
        width: 100%;
    }
`;

const BrandImageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 70%;
    padding: 20px 0px;
    height: 120px;
    min-height: 120px;
`;

const BrandImage = styled.div<{ imageSource: string }>`
    background-image: url(${(p) => p.imageSource});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    height: 100%;
    width: 100%;
`;
