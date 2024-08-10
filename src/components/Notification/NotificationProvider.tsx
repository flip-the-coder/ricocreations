import React, { useState, useCallback, ReactNode } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';
import NotificationContainer from './NotificationContainer';

export interface NotificationModel {
    id: number;
    type: 'success' | 'error';
    content: string | ReactNode;
}

let id = 1;

const NotificationProvider: React.FC = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationModel[]>([]);

    const addNotification = useCallback(
        (content, type) => {
            setNotifications((notifications) => [
                ...notifications,
                {
                    id: id++,
                    type,
                    content
                }
            ]);
        },
        [setNotifications]
    );

    const removeNotification = useCallback(
        (id: number) => {
            setNotifications((notifications) => notifications.filter((t) => t.id !== id));
        },
        [setNotifications]
    );

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification }}>
            <NotificationContainer notifications={notifications} />
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
