import React from 'react';
import styled, { css } from 'styled-components';
import SelectFormField from './FormFields/SelectFormField';

type InlineDropdownProps = {
    options: { label: string; value: string }[];
    label: string;
    name: string;
    disabled?: boolean;
    withMarginRight?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const InlineDropdown = (props: InlineDropdownProps) => {
    return (
        <FormFieldInline withMarginRight={props.withMarginRight}>
            <label htmlFor={props.name}>{props.label}</label>
            <SelectFormField
                sm="true"
                name={props.name}
                options={props.options}
                disabled={props.disabled}
                onChange={props.onChange}
            />
        </FormFieldInline>
    );
};

export default InlineDropdown;

const FormFieldInline = styled.div<{ withMarginRight?: boolean }>`
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    ${(props) =>
        props.withMarginRight &&
        css`
            margin-right: 10px;
        `};

    label {
        margin: 5px 10px 5px 0;
    }

    select {
        min-width: 200px;
    }
`;
