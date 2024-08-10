import React from 'react';
import { useField, Field } from 'formik';
import styled from 'styled-components';

interface Props {
    name: string;
    label: string;
    disabled: boolean;
}

const RadioFormField: React.FC<Props & React.HTMLProps<HTMLInputElement>> = (props) => {
    const [field, { error, touched }] = useField({
        name: props.name
    });
    const isInvalid = error && touched;
    const { ...inputProps } = props;
    return (
        <FormField disabled={props.disabled}>
            {<label htmlFor={props.name}>{props.label}</label>}
            {isInvalid && <div className="error">{error}</div>}
            <div id="my-radio-group"></div>
            <div role="group" aria-labelledby="my-radio-group">
                <label>
                    <Field
                        {...field}
                        {...inputProps}
                        type="radio"
                        name={props.name}
                        value={true}
                        disabled={props.disabled}
                        checked={field.value === true}
                    />{' '}
                    Yes
                </label>
                <label>
                    <Field
                        {...field}
                        {...inputProps}
                        type="radio"
                        name={props.name}
                        value={false}
                        disabled={props.disabled}
                        checked={field.value === false}
                    />{' '}
                    No
                </label>
            </div>
        </FormField>
    );
};

export default RadioFormField;

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
`;
