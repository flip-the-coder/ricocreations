import React, { useState } from 'react';
import { useField } from 'formik';
import { ReactComponent as ErrorIcon } from '../../../icons/form_error.svg';
import { ReactComponent as HideIcon } from '../../../icons/hidden.svg';
import { ReactComponent as ShowIcon } from '../../../icons/shown.svg';
import { FormField } from './PasswordFormField.style';

export const ErrorMessage: React.FC<{ error: string | undefined; showError: boolean | '' | undefined }> = ({
    error,
    showError
}) => {
    return <div className="error">{showError ? error : null}</div>;
};

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    autoComplete?: string;
    sm?: string;
    disabled?: boolean;
    className?: string;
    hint?: string;
}

const PasswordFormField: React.FC<Props> = (props) => {
    const [field, { error, touched }] = useField({
        name: props.name
    });

    const isInvalid = error && touched;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField sm={props.sm} disabled={props.disabled} className={props.className}>
            <label htmlFor={props.name}>{props.label}</label>
            <div style={{ position: 'relative' }}>
                <input
                    {...field}
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                    onFocus={(event) => event.target.select()}
                    className={isInvalid ? 'error' : ''}
                />
                {showPassword ? (
                    <HideIcon className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                    <ShowIcon className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
                )}
                {isInvalid && <ErrorIcon className="error-icon" />}
            </div>
            {props.hint && <p className="hint">{props.hint}</p>}
            <ErrorMessage error={error} showError={isInvalid} />
        </FormField>
    );
};

export default PasswordFormField;
