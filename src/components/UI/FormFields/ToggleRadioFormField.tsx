import React from 'react';
import { useField, Field } from 'formik';
import styled from 'styled-components';

interface Props {
    name: string;
    label: string;
    disabled: boolean;
    options: { label: string; value: string }[];
}

const ToggleRadioFormField: React.FC<Props & React.HTMLProps<HTMLInputElement>> = (props) => {
    const [field, { error, touched }] = useField({
        name: props.name
    });
    const isInvalid = error && touched;
    const { ...inputProps } = props;

    return (
        <FormField disabled={props.disabled}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            {isInvalid && <div className="error">{error}</div>}
            <div id="my-radio-group"></div>
            <div role="group" aria-labelledby="my-radio-group" className="switch-field">
                {props.options.map((option, index) => (
                    <div key={index}>
                        <Field
                            {...field}
                            {...inputProps}
                            id={option.value}
                            type="radio"
                            name={props.name}
                            value={option.value}
                            disabled={props.disabled}
                            checked={field.value === option.value}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
        </FormField>
    );
};

export default ToggleRadioFormField;

export const FormField = styled.div<{ sm?: string; disabled?: boolean; isWidthAuto?: boolean }>`
    margin: 0.5rem 0;
    label,
    input,
    textarea {
        height: 15px;
        font-family: Montserrat;
    }
    label {
        height: 32px;
        color: #202834;
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
        display: block;
        font-weight: 500;
        font-size: 16px;
    }
    .error {
        border-color: #d63831;
        color: #d63831;
    }
    p.hint {
        font-size: 14px;
        color: #9c9c9c;
        font-weight: 500;
    }

    .switch-field {
        display: flex;
        margin-bottom: 36px;
        overflow: hidden;
    }

    .switch-field input {
        position: absolute !important;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        border: 0;
        overflow: hidden;
    }

    .switch-field label {
        background-color: #ffffff;
        color: #a5a5a5;

        text-align: center;
        padding: 8px 16px;
        margin-right: -1px;

        border: 0.5px solid #dddddd;

        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 13px;

        transition: all 0.1s ease-in-out;
    }

    .switch-field label:hover {
        cursor: pointer;
    }

    .switch-field input:checked + label {
        background-color: #e5a24d;
        color: #ffffff;
    }
`;
