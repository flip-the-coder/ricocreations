import React from 'react';
import { useField, Field } from 'formik';
import styled from 'styled-components';

interface Props {
    name: string;
    label: string;
    disabled: boolean;
    options: { label: string; value: string }[];
}

const MultipleRadioFormField: React.FC<Props & React.HTMLProps<HTMLInputElement>> = (props) => {
    const [field, { error, touched }] = useField({
        name: props.name
    });
    const isInvalid = error && touched;
    const { ...inputProps } = props;
    return (
        <FormField disabled={props.disabled}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            {isInvalid && <div className="error">{error}</div>}
            <div role="group" aria-labelledby="my-radio-group" className="radio-inline-group">
                {props.options.map((option, index) => (
                    <div key={index} className="radio-field">
                        <Field
                            {...field}
                            {...inputProps}
                            id={option.value}
                            type="radio"
                            name={props.name}
                            value={option.value}
                            disabled={props.disabled}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
        </FormField>
    );
};

export default MultipleRadioFormField;

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

    .radio-inline-group {
        display: inline-flex;
    }
    .radio-field {
        margin-right: 5rem;
        display: flex;
        align-items: center;
    }

    .radio-field label {
        margin-left: 0.5rem;
        display: inline;
        font-weight: normal;
    }
`;
