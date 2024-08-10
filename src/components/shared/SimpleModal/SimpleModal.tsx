import React from 'react';
import { SimpleModalStyles } from './SimpleModal.style';

interface SimpleModalProps {
    title?: string;
    children: React.ReactChild;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ title, children }) => {
    return (
        <SimpleModalStyles.ModalContainer>
            <SimpleModalStyles.Modal>
                <SimpleModalStyles.ModalTitle>{title}</SimpleModalStyles.ModalTitle>
                {children}
            </SimpleModalStyles.Modal>
        </SimpleModalStyles.ModalContainer>
    );
};

export default SimpleModal;
