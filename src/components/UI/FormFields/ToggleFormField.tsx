import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    name: string;
    label: string;
    sm?: string;
    disabled?: boolean;
    className?: string;
    hint?: string[];
    onChangeCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleFormField: React.FC<Props> = (props) => {
    const [field] = useField({
        name: props.name
    });

    return (
        <FormField sm={props.sm} disabled={props.disabled} className={props.className}>
            <label>{props.label}</label>
            {props.hint && (
                <div style={{ marginBottom: 10 }}>
                    {props.hint.map((hint, index) => (
                        <p key={index} className="hint">
                            {hint}
                        </p>
                    ))}
                </div>
            )}
            <ToggleSwitchDiv disabled={props.disabled}>
                <input
                    {...field}
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    id={props.name}
                    disabled={props.disabled}
                    checked={props.checked}
                    onChange={(e) => {
                        field.onChange(e);
                        if (props.onChangeCallback) props.onChangeCallback(e);
                    }}
                />
                {props.name && (
                    <label className="toggle-switch-label" htmlFor={props.name}>
                        <span className="toggle-switch-inner" data-yes={'ON'} data-no={'OFF'}></span>
                        <span
                            className={
                                props.disabled ? 'toggle-switch-switch toggle-switch-disabled' : 'toggle-switch-switch'
                            }
                        ></span>
                    </label>
                )}
            </ToggleSwitchDiv>
        </FormField>
    );
};

export default ToggleFormField;

const FormField = styled.div<{ sm?: string; disabled?: boolean }>`
    margin: 1rem 0;
    label {
        display: block;
        font-family: Montserrat;
        font-size: ${(p) => (p.sm ? 14 : 16)}px;
        height: 32px;
        color: #202834;
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
    }
    p.hint {
        font-size: 14px;
        color: #9c9c9c;
        font-weight: 500;
    }
`;

const ToggleSwitchDiv = styled.div<{ disabled?: boolean }>`
    position: relative;
    width: 75px;
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    text-align: left;
    opacity: ${(p) => (p.disabled ? 0.7 : 1)};

    .toggle-switch-disabled {
        background-color: #ccc;
        cursor: not-allowed;
        &::before {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
    .toggle-switch-checkbox {
        display: none;
    }
    .toggle-switch-label {
        display: block;
        overflow: hidden;
        cursor: pointer;
        border: 0 solid #ccc;
        border-radius: 20px;
        margin: 0;
    }
    .toggle-switch-inner {
        display: block;
        width: 200%;
        margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
        &::before,
        &::after {
            display: block;
            float: left;
            width: 50%;
            height: 34px;
            padding: 0;
            line-height: 34px;
            font-size: 14px;
            color: white;
            font-weight: bold;
            box-sizing: border-box;
        }
        &:before {
            content: attr(data-yes);
            text-transform: uppercase;
            padding-left: 10px;
            background-color: #f09d39;
            color: #fff;
        }
        &::after {
            content: attr(data-no);
            text-transform: uppercase;
            padding-right: 10px;
            background-color: #ccc;
            color: #fff;
            text-align: right;
        }
    }
    .toggle-switch-switch {
        display: block;
        width: 24px;
        margin: 5px;
        background: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 40px;
        border: 0 solid #ccc;
        border-radius: 20px;
        transition: all 0.3s ease-in 0s;
    }
    .toggle-switch-checkbox:checked + .toggle-switch-label .toggle-switch-inner {
        margin-left: 0;
    }
    .toggle-switch-checkbox:checked + .toggle-switch-label .toggle-switch-switch {
        right: 0px;
    }
    .toggle-switch.small-switch {
        width: 40px;
    }
    .toggle-switch.small-switch .toggle-switch-inner:after,
    .toggle-switch.small-switch .toggle-switch-inner:before {
        content: '';
        height: 20px;
        line-height: 20px;
    }
    .toggle-switch.small-switch .toggle-switch-switch {
        width: 16px;
        right: 20px;
        margin: 2px;
    }
    @media screen and (max-width: 991px) {
        .toggle-switch {
            transform: scale(0.9);
        }
    }
    @media screen and (max-width: 767px) {
        .toggle-switch {
            transform: scale(0.825);
        }
    }
    @media screen and (max-width: 575px) {
        .toggle-switch {
            transform: scale(0.75);
        }
    }
`;
