import React, { ReactNode } from 'react';

export interface NotificationContextData {
    addNotification: (content: string | ReactNode, type: 'success' | 'error') => void;
    removeNotification: (id: number) => void;
}

export const NotificationContext = React.createContext<NotificationContextData | undefined>(undefined);
