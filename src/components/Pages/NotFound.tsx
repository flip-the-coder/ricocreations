import React from 'react';
import { useIntl } from 'react-intl';
import ErrorMessage from '../UI/ErrorMessage';

const NotFound: React.FC = () => {
    const intl = useIntl();
    return (
        <ErrorMessage
            title={intl.formatMessage({ id: 'error.NotFound.title' })}
            message={intl.formatMessage({ id: 'error.NotFound.message' })}
        />
    );
};

export default NotFound;
