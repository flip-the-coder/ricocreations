import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ReactComponent as Calendar } from '../../icons/calandar.svg';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    name: string;
    label: string;
    sm?: string;
    disabled?: boolean;
    className?: string;
    hint?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerField: React.FC<Props> = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField({
        name: props.name,
        type: props.name
    });

    return (
        <FormField sm={props.sm} disabled={props.disabled} className={props.className}>
            <label htmlFor={props.name}>{props.label}</label>
            <DatePickerContainer>
                <Calendar />
                <DatePicker
                    {...field}
                    {...props}
                    placeholderText={'mm/dd/yyyy'}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={(val) => {
                        setFieldValue(field.name, val);
                    }}
                />
                {props.hint && <p className="hint">{props.hint}</p>}
            </DatePickerContainer>
        </FormField>
    );
};

export default DatePickerField;

const FormField = styled.div<{ sm?: string; disabled?: boolean }>`
    display: flex;
    flex-direction: column;

    margin: 0.5rem 0;
    label,
    input {
        font-family: Montserrat;
        font-size: ${(p) => (p.sm ? 14 : 16)}px;
    }
    label {
        display: block;
        font-family: Montserrat;
        font-size: 14px;
        height: 32px;
        color: #202834;
        -webkit-text-decoration: none solid rgb(32, 40, 52);
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
    }
    input {
        width: 100%;
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

const DatePickerContainer = styled.div`
    position: relative;

    .react-datepicker-wrapper {
        display: inline-block;
        width: 100%;
    }
    svg {
        fill: #666;
        position: absolute;
        right: 10px;
        margin-top: 5px;
        z-index: 1;
    }
`;
