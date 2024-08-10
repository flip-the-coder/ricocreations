import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from '../Button.styled';

interface Props {
    onClose: () => void;
    message: string;
}

const NotificationModal: React.FC<Props> = ({ onClose, message }) => {
    const intel = useIntl();

    return (
        <div style={{ width: 400 }}>
            <p>{message}</p>
            <div style={{ textAlign: 'center', marginTop: 25 }}>
                <Button onClick={onClose} className="btn-cancel" noRaise>
                    {intel.formatMessage({ id: 'MyHomes.LotSpecificHomes.limit.close' })}
                </Button>
            </div>
        </div>
    );
};

export default NotificationModal;
