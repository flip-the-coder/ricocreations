import styled from 'styled-components';

const ModalContainer = styled.div`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000066;
    backdrop-filter: blur(2px);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    width: 100%;
    margin: 18px;
    padding: 20px;
    background-color: white;
    color: black;
    border-radius: 6px;
`;

const ModalTitle = styled.div`
    font-size: 20px;
    margin-bottom: 32px;
`;

export const SimpleModalStyles = {
    ModalContainer,
    Modal,
    ModalTitle
};
