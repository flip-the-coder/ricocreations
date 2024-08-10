import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useTransition } from 'react-spring';
import Notification from './Notification';
import { NotificationModel } from './NotificationProvider';

const Wrapper = styled.div`
    position: absolute;
    right: 5px;
    top: 60px;
    z-index: 9999;
    overflow: hidden !important;
`;

interface Props {
    notifications: NotificationModel[];
}

const NotificationContainer: React.FC<Props> = ({ notifications }) => {
    const transitions = useTransition(notifications, (notification) => notification.id, {
        from: { right: '-100%' },
        enter: { right: '0%' },
        leave: { right: '-100%' }
    });

    return createPortal(
        <Wrapper>
            {transitions.map(({ item, key, props }) => (
                <Notification key={key} id={item.id} style={props} className={item.type}>
                    {item.content}
                </Notification>
            ))}
        </Wrapper>,
        document.body
    );
};

export default NotificationContainer;
