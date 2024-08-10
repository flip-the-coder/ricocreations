import React, { useEffect } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import useNotification from '../../hooks/useNotification';

const DEFAULT_TIMEOUT = 3000;

interface Props {
    id: number;
    style: React.CSSProperties | undefined;
    className?: string;
    timeout?: number;
}

const Notification: React.FC<Props> = ({ children, id, style, className, timeout }) => {
    const { removeNotification } = useNotification();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(id);
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [id, timeout, removeNotification]);

    return (
        <Wrapper onClick={() => removeNotification(id)} className={className} style={style}>
            {children}
        </Wrapper>
    );
};

Notification.defaultProps = {
    timeout: DEFAULT_TIMEOUT
};

export default Notification;

const Wrapper = styled(animated.div)`
    margin-right: 10px;
    margin-top: 10px;
    min-width: 249px;

    position: relative;
    padding: 16px;
    border-radius: 5px;
    background: #202834;
    color: #fff;
    background-size: cover;

    font-family: Montserrat;
    font-size: 18px;
    color: #ffffff;
    text-decoration: none solid rgb(255, 255, 255);

    &.success {
        background: #19bd4f;
    }
    &.error {
        background: #d63831;
    }
`;
