import styled from 'styled-components';
import LoginBackgroundImage from './login-background.jpg';

export const LoginWrapper = styled.div`
    background-size: cover;
    overflow: auto;

    background: url(${LoginBackgroundImage}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

export const LoginFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: 100%;
`;

export const LoginContainer = styled.div`
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
    padding: 2.5% 3% 2%;
    margin: 35px 0;
    display: inline-flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    border-radius: 10px;
    width: 30%;
    min-width: 430px;
    align-items: center;

    form {
        width: 80%;
    }

    input {
        width: 100%;
        height: 40px;
    }

    label {
        text-align: left;
        font-size: ${(props) => props.theme.typography.fontFamily};
        font-weight: normal;
        letter-spacing: 0px;
        color: #626262;
    }

    @media (max-width: 575px) {
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        position: absolute;
        overflow: auto;
        min-width: 100%;
        height: 100%;
        width: 100%;
        margin: 0px;
    }
`;

export const Title = styled.div`
    font-family: Ariel;
    font-size: 22px;
    font-weight: normal;
    font-style: italic;
    letter-spacing: 1.2px;
    color: #414141;
    text-transform: capitalize;
    opacity: 1;
    padding: 0px 0px 30px;
`;

export const SubTitle = styled.div`
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-weight: 400;
    font-size: 14px;
    color: #414141;
    opacity: 1;
    padding: 0px 0px 40px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 40px 0px 20px 0px;

    > button {
        font-size: 16px;
        letter-spacing: 0.88px;
    }
`;

export const InputContainer = styled.div`
    padding-bottom: 20px;
    padding-right: 20px;
    text-transform: capitalize;
    font-weight: 500;

    &.passwordFieldContainer {
        padding-bottom: 10px;
    }
`;

export const ErrorContainer = styled.div`
    height: auto;
    border-radius: 3px;
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    border: 1px solid;
    text-align: left;
    padding: 10px;
    margin-bottom: 30px;
`;

export const License = styled.div`
    padding: 20px 0px 0px 0px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.neutrals[0]};
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-weight: 500;
    text-align: center;
`;

export const RegisterContainer = styled.div`
    text-align: left;
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-weight: 400;
    letter-spacing: 0px;
    color: #626262;
    display: flex;
    flex-direction: row;

    a {
        color: #626262;
        transition: color 0.2s ease-in-out;
        &:hover {
            color: ${(props) => props.theme.colors.primary};
        }
    }
`;

export const Account = styled.div`
    padding-right: 10px;
`;

export const ParagraphContainer = styled.div`
    font-size: 14px;
    text-align: center;
    line-height: 1.4;

    p {
        margin: 0 30px 25px;
    }
`;
