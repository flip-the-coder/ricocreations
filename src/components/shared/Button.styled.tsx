import styled from 'styled-components';

export const Button = styled.button<{ primary?: boolean; noRaise?: boolean }>`
    font-family: ${(props) => props.theme.typography.fontFamily};
    padding: 0.8rem 2.5rem;
    background-color: ${(props) => (props.primary ? props.theme.colors.primary : props.theme.colors.secondaries[0])};
    background-size: cover;
    border: 1px solid ${(props) => (props.primary ? props.theme.colors.primary : props.theme.colors.secondaries[0])};
    font-size: 16px;
    color: #ffffff;
    text-decoration: none solid rgb(255, 255, 255);
    text-align: center;
    cursor: pointer;
    transition: 0.1s linear;
    outline: none;
    margin: 0px 1rem;
    border-radius: 3px;

    &:hover {
        opacity: 0.75;
        transform: ${(props) => (props.noRaise ? 'none' : 'translateY(-2px);')};
    }

    &.btn-cancel {
        background-color: #9c9c9c;
        border-color: #9c9c9c;
        color: #ffffff;
        &:hover {
            background-color: rgb(53, 53, 53);
            border-color: rgb(53, 53, 53);
        }
    }

    &:disabled {
        background-color: rgba(138, 138, 138, 0.2);
        color: #8a8a8a;
        box-shadow: none;
        cursor: not-allowed;
        border: 1px solid #8a8a8a;
        &:hover {
            opacity: 1;
            transform: none;
            background-color: rgba(138, 138, 138, 0.2);
            color: #8a8a8a;
        }
    }
`;

export const CancelButton = styled.button<{ primary?: boolean }>`
    padding: 0.8rem 2.5rem;
    background-color: #ffffff;
    background-size: cover;
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-size: 16px;
    color: ${(props) => (props.primary ? props.theme.colors.primary : props.theme.colors.secondaries[0])};
    text-decoration: none solid rgb(32, 40, 52);
    text-align: center;
    border: 1px solid ${(props) => (props.primary ? props.theme.colors.primary : props.theme.colors.secondaries[0])};
    transition: 0.1s linear;
    cursor: pointer;
    outline: none;
    margin: 0px 1rem;

    &:hover {
        border: 1px solid ${(props) => (props.primary ? props.theme.colors.primary : props.theme.colors.secondaries[0])};
        background-color: ${(props) =>
            props.primary ? props.theme.colors.primary : props.theme.colors.secondaries[0]};
        color: #ffffff;
    }

    &:disabled {
        background-color: rgba(138, 138, 138, 0.2);
        color: #8a8a8a;
        box-shadow: none;
        cursor: not-allowed;
        &:hover {
            opacity: 1;
            transform: none;
            background-color: rgba(138, 138, 138, 0.2);
            color: #8a8a8a;
        }
    }
`;

export const SleekButton = styled.button`
    cursor: pointer;
    font-size: 16px;
    font-family: ${(props) => props.theme.typography.fontFamily};
    text-align: center;
    border-radius: 4px;
    border-color: initial;
    outline: none;
    transition: filter 0.2s ease-out;
    border: 0px;
    height: 40px;

    &.primary {
        padding: 8px 13px;
        background-color: #3572c9;
        color: white;

        &:hover {
            filter: brightness(85%);
        }

        &:disabled {
            background-color: rgba(138, 138, 138, 0.2);
            color: #8a8a8a;
            box-shadow: none;
            cursor: not-allowed;
            border: 0px;
            &:hover {
                opacity: 1;
                transform: none;
                background-color: rgba(138, 138, 138, 0.2);
                color: #8a8a8a;
            }
        }
    }

    &.cancel {
        padding: 9px 15px;
        background-color: initial;
        border: 0px;
        color: white;
        margin-right: 10px;
        transition-property: background-color, color;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
        &:hover {
            background-color: initial;
        }
    }
`;
