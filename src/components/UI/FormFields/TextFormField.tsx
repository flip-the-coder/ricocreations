import React from 'react';
import { Field, useField } from 'formik';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from '../../icons/form_error.svg';

interface Props {
    name: string;
    label?: string;
    type: string;
    placeholder?: string;
    autoComplete?: string;
    sm?: string;
    disabled?: boolean;
    className?: string;
    hint?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isTextArea?: boolean;
    maxlength?: number;
    size?: number;
    initalVal?: string;
    isInvalid?: boolean;
}

type TextFormFieldProps = Props & React.HTMLProps<HTMLInputElement>;

const TextFormField: React.FC<TextFormFieldProps> = (props: TextFormFieldProps) => {
    const [field, { error, touched }] = useField({
        name: props.name,
        type: props.name
    });
    const value = field.value || props.initalVal;
    const isInvalid = (error && touched) || props.isInvalid;
    const { isTextArea, ...inputProps } = props;
    return (
        <FormField
            sm={props.sm}
            disabled={props.disabled}
            className={props.className}
            isWidthAuto={props.size !== undefined || props.max !== undefined}
        >
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <div style={{ position: 'relative', display: `${props.size ? 'inline-block' : 'block'}` }}>
                {isTextArea && <Field component="textarea" value={value ? value : ''} {...inputProps} />}
                {!isTextArea && (
                    <input
                        {...field}
                        {...inputProps}
                        value={value !== undefined && value !== null ? value : ''}
                        onFocus={(event) => event.target.select()}
                        className={isInvalid ? 'error' : ''}
                        onChange={(e) => {
                            field.onChange(e);
                            if (props.onChange) return props.onChange(e);
                        }}
                    />
                )}
                {isInvalid && <ErrorIcon className="error-icon" />}
            </div>
            {props.hint && <p className="hint">{props.hint}</p>}
            {isInvalid && <div className="error">{error}</div>}
        </FormField>
    );
};

export default TextFormField;

export const FormField = styled.div<{ sm?: string; disabled?: boolean; isWidthAuto?: boolean }>`
    margin: 0.5rem 0;
    label,
    input,
    textarea {
        font-family: Montserrat;
        font-size: ${(p) => (p.sm ? 14 : 16)}px;
    }
    label {
        height: 32px;
        color: #202834;
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
        display: block;
    }
    input,
    textarea {
        width: ${(p) => (p.isWidthAuto ? 'auto' : '100%')};
        height: ${(p) => (p.sm ? 34 : 41)}px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        background-color: ${(p) => (p.disabled ? '#ebebeb' : '#ffffff')};
        background-size: cover;
        text-indent: 10px;
        color: ${(p) => (p.disabled ? '#8a8a8a' : '#202834')};
        outline: none;
        transition: 0.1s linear;
        &:focus {
            border-color: #202834;
            background-size: cover;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        }
    }
    textarea {
        height: 120px;
        padding: 10px;
        text-indent: 0;
        background-color: ${(p) => (p.disabled ? '#ebebeb' : '#ffffff')};
        &:focus {
            border-color: ${(p) => (p.disabled ? '#d1d1d1' : '#202834')};
            box-shadow: ${(p) => (p.disabled ? 'none' : '1px 1px 5px rgba(0, 0, 0, 0.3)')};
        }
    }
    .error {
        border-color: #d63831;
        color: #d63831;
    }
    .error-icon {
        position: absolute;
        right: 5px;
        top: ${(p) => (p.sm ? 5 : 9)}px;
        font-size: ${(p) => (p.sm ? 14 : 16)}px;
        fill: #d63831;
    }
    p.hint {
        font-size: 14px;
        color: #9c9c9c;
        font-weight: 500;
    }
`;
