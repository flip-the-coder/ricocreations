import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';

const DELAYED_SPINNER_DEFAULT_TIMEOUT = 300;
const DELAYED_SPINNER_DEFAULT_SIZE = 50;

const DelayedSpinner = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), DELAYED_SPINNER_DEFAULT_TIMEOUT);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return <React.Fragment>{show && <Spinner size={`${DELAYED_SPINNER_DEFAULT_SIZE}px`} />}</React.Fragment>;
};

export default DelayedSpinner;
