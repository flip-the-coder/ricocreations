import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const useNotification = () => {
    const notificationHelpers = useContext(NotificationContext);
    if (!notificationHelpers) {
        throw new Error('useNotification must be used within the NotificationContext.Provider');
    }
    return notificationHelpers;
};

export default useNotification;
