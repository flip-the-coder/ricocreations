import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderStyles } from './Header.style';
import { isMobile } from '../../utils/browserUtils';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    NavigationBar,
    LinkOption,
    LogoText,
    LinksContainer,
    BurgerMenu,
    LogoImage,
    LogoWrapper,
  } = HeaderStyles;

  const pages = [
    { name: 'Home', path: '/home' },
    { name: 'Dispensary', path: '/dispensary' },
    // { name: 'About', path: '/aboutMe' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <NavigationBar>
      <LogoWrapper>
        <LogoImage src='' alt='Rico Creations' />
      </LogoWrapper>
      {isMobile() && <LogoText>Rico Creations</LogoText>}
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
