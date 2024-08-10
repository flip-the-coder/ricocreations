import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import Select from 'react-select';

const styles = {
    container: (base) => ({
        ...base,
        flex: 1,
        minWidth: 200
    })
};
interface Props<T, L extends keyof T, V extends keyof T> {
    name: string;
    label?: string;
    sm?: string;
    options: Array<T>;
    value: T;
    optionLabel: L | string;
    optionValue?: V | string;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
    onChange: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    onBlur: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    isSearchable?: boolean;
    isClearable?: boolean;
    isHidden?: boolean;
    getOptionLabel?: (o: T) => string;
    onChangeCallback?: (option: T | string) => void;
    hint?: string;
}

function ReactSelectFormField<T, L extends keyof T, V extends keyof T>(
    props: Props<T, L, V>
): React.ReactElement<Props<T, L, V>> {
    // eslint-disable-next-line
    const [field, { error, touched }] = useField({
        name: props.name,
        type: props.name
    });

    const isInvalid =
        ((props.optionValue && props.value && props.value['value'].length === 0) || !props.value) && touched;

    return (
        <FormField sm={props.sm} disabled={props.disabled} className={props.className}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <Select
                styles={styles}
                id={props.name}
                options={props.options}
                getOptionLabel={props.getOptionLabel ? props.getOptionLabel : (o) => o[props.optionLabel as string]}
                getOptionValue={(o) => {
                    if (!props.optionValue) {
                        return o;
                    }
                    return o[props.optionValue as string];
                }}
                onChange={(o, a) => {
                    if (o) {
                        if (!props.optionValue) {
                            props.onChange(props.name, o);
                        } else {
                            const value = o![props.optionValue as string];
                            props.onChange(props.name, value);
                        }
                    } else {
                        props.onChange(props.name, null);
                    }
                    if (props.onChangeCallback) {
                        props.onChangeCallback(!props.optionValue ? o : o![props.optionValue as string]);
                    }
                }}
                onBlur={() => props.onBlur(props.name, true)}
                value={props.value}
                isSearchable={props.isSearchable}
                placeholder={props.placeholder ? props.placeholder : undefined}
                className={props.className ? props.className : 'ReactSelectFormField'}
                classNamePrefix={props.className ? props.className : 'ReactSelectFormField'}
                isDisabled={props.disabled}
                isClearable={props.isClearable}
                // @ts-ignore
                isHidden={props.isHidden}
            />
            {props.hint && <p className="hint">{props.hint}</p>}
            <div className="error">{isInvalid ? error : ''}</div>
        </FormField>
    );
}

export default ReactSelectFormField;

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
        text-indent: 10px;
    }
    .error {
        border-color: #d63831;
        color: #d63831;
        height: 19px;
    }
    p.hint {
        font-size: 14px;
        color: #9c9c9c;
        font-weight: 500;
    }
    .ReactSelectFormField__control {
        min-height: 34px;
    }
    .ReactSelectFormField__indicator {
        padding: 0;
    }
    .ReactSelectFormField__menu {
        z-index: 2;
    }
`;
