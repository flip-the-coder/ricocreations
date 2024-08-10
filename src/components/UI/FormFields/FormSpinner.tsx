import { useFormikContext } from 'formik';
import React from 'react';
import DelayedSpinner from '../DelayedSpinner';

const FormSpinner = () => {
    const { isSubmitting } = useFormikContext();
    return (isSubmitting && <DelayedSpinner />) || null;
};

export default FormSpinner;
