import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LogoHeight, colors, fontSizes, fonts } from '../../SharedThemes';
import { MEDIUM_DEVICE_WIDTH } from '../../utils/browserUtils';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pages = [
    { name: 'Home', path: '/home' },
    { name: 'Dispensary', path: '/dispensary' },
    // { name: 'About', path: '/aboutMe' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <NavigationBar>
      <LogoWrapper>
        <img src={''} alt="Update Logo" />
      </LogoWrapper>
      <BurgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <LinksContainer isOpen={isMenuOpen}>
        {pages.map((page) => (
          <LinkOption
            key={page.path}
            className={location.pathname === page.path ? 'active' : ''}
          >
            <NavLink to={page.path} onClick={handleLinkClick}>
              {page.name}
            </NavLink>
          </LinkOption>
        ))}
      </LinksContainer>
    </NavigationBar>
  );
};

export default Header;

const headerHeight = 50;

const NavigationBar = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${colors.navBar};
  box-shadow: 0px 3px 4px 0px #00000024, 0px 3px 11px -2px #00000003;
  height: ${headerHeight - 1}px;
  margin-bottom: 6px;

  @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
    position: relative;
  }
`;

const LogoWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  margin-right: 20px;

  img {
    padding-left: 12px;
    max-height: ${LogoHeight};
    height: ${LogoHeight};
    align-self: center;
    border: 2px solid red;

    @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
      height: 45px;
    }
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
  
  @media only screen and (max-width: ${MEDIUM_DEVICE_WIDTH}px) {
    flex-direction: column;
    background: ${colors.navBar};
    position: fixed;
    top: ${headerHeight}px; /* Adjust based on header height */
    right: 0;
    width: 100vw;
    border-left: 1px solid grey;
    padding: 1rem;
    z-index: 1000; /* Ensure the menu appears above other content */
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
    flex-direction: column;
    cursor: pointer;
    margin-left: auto;  /* Aligns to the right */
    position: relative;
    width: 30px; /* Adjust width as needed */
    height: 20px; /* Adjust height as needed */

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 2px;
      background: white;
      transition: 0.3s;
      left: 0;
    }

    &::before {
      top: 0; /* Top line */
    }

    &::after {
      bottom: 0; /* Bottom line */
    }

    & > div {
      position: absolute;
      width: 25px;
      height: 2px;
      background: white;
      transition: 0.3s;
      top: 50%; /* Center line */
      transform: translateY(-50%);
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
