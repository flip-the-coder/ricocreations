import styled from 'styled-components';
import { LogoHeight, colors, fontSizes, fonts } from '../../SharedThemes';
import { MEDIUM_DEVICE_WIDTH } from '../../utils/browserUtils';

const headerHeight = 50;

const NavigationBar = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${colors.navBar};
    box-shadow: 0px 3px 4px 0px #00000024, 0px 3px 11px -2px #00000003;
    height: ${headerHeight}px;
    margin-bottom: 6px;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-sizing: border-box;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    font-weight: bold;
    flex: 1;

    position: relative;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const LogoImage = styled.img`
    padding-left: 12px;
    max-height: ${LogoHeight};
    height: ${LogoHeight};
    align-self: center;
    box-sizing: border-box;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        height: 45px;
        width: 50px;
    }
`;

const LogoText = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-family: 'Dancing Script', cursive;

    box-sizing: border-box;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        font-size: 1.5rem;
    }
`;

const LinksContainer = styled.ul<{ isOpen: boolean }>`
    height: 100%;
    display: flex;
    align-items: center;
    font: normal normal 400 ${fontSizes.md} ${fonts.primary};
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    box-sizing: border-box;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        flex-direction: column;
        background: ${colors.navBar};
        position: fixed;
        top: ${headerHeight}px;
        right: 0;
        width: 100vw;
        padding: 1rem;
        z-index: 1000;
        max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
        opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    }

    @media only screen and (min-width: ${MEDIUM_DEVICE_WIDTH + 1}px) {
        display: flex;
        flex-direction: row;
        position: static;
        max-height: none;
        opacity: 1;
        z-index: auto;
    }
`;

const BurgerMenu = styled.div`
    display: none;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        display: flex;
        cursor: pointer;
        margin-right: 20px;
        width: 30px;
        height: 20px;
        box-sizing: border-box;
        position: relative;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 25px;
            height: 2px;
            background: white;
            transition: 0.3s;
            left: 0;
            box-sizing: border-box;
        }

        &::before {
            top: 0;
        }

        &::after {
            bottom: 0;
        }

        & > div {
            position: absolute;
            width: 25px;
            height: 2px;
            background: white;
            transition: 0.3s;
            top: 50%;
            transform: translateY(-50%);
            box-sizing: border-box;
        }
    }
`;

const LinkOption = styled.li`
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.15s;
    letter-spacing: 1.28px;
    margin-left: 20px;
    text-align: center;
    opacity: 1;
    box-sizing: border-box;

    a {
        color: white;
        opacity: 0.6;
        text-decoration: none;
        transition: opacity 0.2s ease-in-out;

        &.active,
        :hover {
            opacity: 1;
        }

        &.active {
            font-weight: 500;
        }
    }

    &.active {
        box-shadow: inset 0 -4px 0 white;
    }

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
        margin-left: 0;
        padding: 15px;
    }
`;

const ContentWrapper = styled.div`
    margin-top: ${headerHeight}px;
    box-sizing: border-box;
`;

export const HeaderStyles = {
    NavigationBar,
    LinkOption,
    LogoText,
    LinksContainer,
    BurgerMenu,
    LogoImage,
    LogoWrapper,
    ContentWrapper
};
