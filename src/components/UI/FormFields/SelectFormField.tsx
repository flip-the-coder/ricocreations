import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

interface Props extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    name: string;
    label?: string;
    sm?: string;
    options: Array<{ label: string; value: string }>;
    disabled?: boolean;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFormField: React.FC<Props> = (props) => {
    const [field, { error, touched }] = useField({
        name: props.name,
        type: props.name
    });

    const isInvalid = error && touched;

    return (
        <FormField sm={props.sm} disabled={props.disabled} className={props.className}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <select
                {...field}
                {...props}
                onChange={(e) => {
                    field.onChange(e);
                    if (props.onChange) return props.onChange(e);
                }}
                className={isInvalid ? 'error' : ''}
            >
                {props.options.map((op, index) => (
                    <option key={op.value + '_' + index} value={op.value}>
                        {op.label}
                    </option>
                ))}
            </select>
            {isInvalid && <div className="error">{error}</div>}
        </FormField>
    );
};

export default SelectFormField;

const FormField = styled.div<{ sm?: string; disabled?: boolean }>`
    margin: 0.5rem 0;
    label,
    select {
        font-family: Montserrat;
        font-size: ${(p) => (p.sm ? 14 : 16)}px;
    }
    label {
        height: 32px;
        color: #202834;
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
    }
    select {
        width: 100%;
        height: ${(p) => (p.sm ? 34 : 41)}px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        background-color: ${(p) => (p.disabled ? '#ebebeb' : '#ffffff')};
        color: ${(p) => (p.disabled ? '#8a8a8a' : '#202834')};
        background-size: cover;
    }
    .error {
        border-color: #d63831;
        color: #d63831;
    }
`;
