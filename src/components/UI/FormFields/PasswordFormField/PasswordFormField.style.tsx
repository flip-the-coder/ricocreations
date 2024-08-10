import styled from 'styled-components';

export const FormField = styled.div<{ sm?: string; disabled?: boolean }>`
    label,
    input {
        font-family: ${(props) => props.theme.typography.fontFamily};
        font-size: ${(props) => (props.sm ? 14 : 16)}px;
    }
    label {
        height: 32px;
        color: #202834;
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
        font-weight: bold;
    }
    input,
    textarea {
        width: 100%;
        height: ${(props) => (props.sm ? 34 : 41)}px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        background-color: ${(props) => (props.disabled ? '#ebebeb' : '#ffffff')};
        background-size: cover;
        text-indent: 10px;
        color: ${(props) => (props.disabled ? '#8a8a8a' : '#202834')};
        outline: none;
        transition: 0.1s linear;
        &:focus {
            border-color: #202834;
            background-size: cover;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        }
        &.error {
            border-color: ${(props) => props.theme.colors.error};
        }
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        &::placeholder {
            color: #d1d1d1;
            opacity: 1; /* Firefox */
        }
        /* Internet Explorer 10-11 */
        &:-ms-input-placeholder {
            color: #d1d1d1;
        }
        /* Microsoft Edge */
        &::-ms-input-placeholder {
            color: #d1d1d1;
        }
    }
    div.error {
        font-family: ${(props) => props.theme.typography.fontFamily};
        color: ${(props) => props.theme.colors.error};
        font-size: 12px;
        min-height: 18px;
    }
    svg.error-icon {
        position: absolute;
        right: 30px;
        top: ${(props) => (props.sm ? 8 : 9)}px;
        font-size: ${(props) => (props.sm ? 14 : 16)}px;
        fill: ${(props) => props.theme.colors.error};
    }
    svg.eye-icon {
        position: absolute;
        right: 5px;
        top: ${(props) => (props.sm ? 8 : 9)}px;
        font-size: ${(props) => (props.sm ? 14 : 16)}px;
        fill: ${(props) => props.theme.colors.black};
    }
    p.hint {
        font-size: 14px;
        color: #9c9c9c;
        font-weight: 500;
    }
`;
