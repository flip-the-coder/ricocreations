import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LogoHeight, colors, fontSizes, fonts } from '../../../../SharedThemes';
import { MEDIUM_DEVICE_WIDTH } from '../../../../utils/browserUtils';

const DispensaryHeader: React.FC = () => {
  const location = useLocation();

  const pages = [
    { name: 'Home', path: '/home' },
    { name: 'Dispensary', path: '/dispensary' },
    { name: 'About', path: '/aboutMe' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <NavigationBar>
      <LogoWrapper>
        <img src={''} alt="Update Logo" />
      </LogoWrapper>
      <LinksContainer>
        {pages.map((page) => (
          <LinkOption key={page.path} className={location.pathname === page.path ? 'active' : ''}>
            <NavLink to={page.path}>
              {page.name}
            </NavLink>
          </LinkOption>
        ))}
      </LinksContainer>
    </NavigationBar>
  );
};

export default DispensaryHeader;

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

const LinksContainer = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
  font: normal normal 400 ${fontSizes.md} ${fonts.primary};
  margin-right: 1rem;
  flex: 2 auto;
  justify-content: start;
  list-style: none;
  padding: 0;
`;

const LinkOption = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: color 0.15s;
  letter-spacing: 1.28px;
  margin-left: 40px;
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
`;
