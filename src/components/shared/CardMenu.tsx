import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ReactComponent as MenuIcon } from '../../icons/Icon material-more-vert.svg';
import { MEDIUM_DEVICE_WIDTH } from '../../utils/browserUtils';

interface Props {
    children?: ReactNode;
}

const CardMenu: React.FC<Props> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const node = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(node, () => setIsMenuOpen(false));

    return (
        <div
            className="center"
            ref={node}
            style={{ position: 'relative' }}
            onClick={(event) => event.stopPropagation()}
        >
            <MenuIconWrapper className="center" onClick={() => setIsMenuOpen(!isMenuOpen)} open={isMenuOpen}>
                <MenuIcon />
            </MenuIconWrapper>
            {isMenuOpen && children}
        </div>
    );
};

export default CardMenu;

const MenuIconWrapper = styled.div<{ open: boolean }>`
    position: absolute;

    svg {
        fill: ${({ open }) => (open ? '#9C9C9C' : '#000000')};
        width: 6px;
        height: 14px;
        margin-right: 5px;
        transition: all 0.2s ease-in-out;
        &:hover {
            fill: #9c9c9c;
        }
    }
`;

export const CardMenuContainer = styled.div<{ smaller?: boolean }>`
    width: ${(props) => (props.smaller ? 150 : 198)}px;
    height: auto;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 10px #00000029;
    border: 1px solid #ebebeb;
    opacity: 1;

    position: absolute;
    margin-left: -190px;

    display: flex;
    flex-direction: column;

    z-index: 2;

    &.top-right-origin {
        margin-left: 0;
        position: absolute;
        right: 50%;
        top: 50%;
    }

    div:last-child {
        border-bottom: none !important;
    }

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        margin-left: ${(props) => (props.smaller ? '-120px' : '')};
        width: ${(props) => (props.smaller ? '100px' : '')};
    }
`;

export const CardMenuItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ebebeb;
    color: #414141;
    font-size: 14px;
    transition: all 0.2s ease-in-out;

    svg {
        transition: all 0.2s ease-in-out;
        fill: #9c9c9c;
        width: 24px;
        margin-right: 15px;
    }

    &:hover {
        background-color: #f5f5f5;
        svg {
            fill: #414141;
        }
    }
`;
