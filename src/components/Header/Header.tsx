import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderStyles } from './Header.style';
import { isUserUsingMobile } from '../../utils/browserUtils';
import { FaHome, FaStore, FaCalendarAlt, FaPhone, FaShoppingCart } from 'react-icons/fa';

const { NavigationBar, LinkOption, LogoText, LinksContainer, BurgerMenu, LogoImage, LogoWrapper, Icon } = HeaderStyles;

const pages = [
    { name: 'Home', path: '/home', icon: <FaHome /> },
    { name: 'Dispensary', path: '/dispensary', icon: <FaStore /> },
    { name: 'Events', path: '/events', icon: <FaCalendarAlt /> },
    { name: 'Contact', path: '/contact', icon: <FaPhone /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart /> }
];

const Header: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const burgerMenuRef = useRef<HTMLDivElement>(null);
    const linksContainerRef = useRef<HTMLUListElement>(null);

    const handleLinkClick = useCallback(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            burgerMenuRef.current &&
            !burgerMenuRef.current.contains(event.target as Node) &&
            linksContainerRef.current &&
            !linksContainerRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    return (
        <NavigationBar>
            {isUserUsingMobile() ? (
                <LogoText>Rico Creations</LogoText>
            ) : (
                <LogoWrapper>
                    <LogoImage
                        src="http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg"
                        alt="Logo"
                    />
                </LogoWrapper>
            )}
            <BurgerMenu ref={burgerMenuRef} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <LinksContainer ref={linksContainerRef} isOpen={isMenuOpen}>
                {pages.map((page) => (
                    <LinkOption key={page.path} className={location.pathname === page.path ? 'active' : ''}>
                        <NavLink to={page.path} onClick={handleLinkClick}>
                            {isMenuOpen && <Icon>{page.icon}</Icon>} {/* Show icons only in mobile view */}
                            <span>{page.name}</span> {/* Show text on desktop */}
                        </NavLink>
                    </LinkOption>
                ))}
            </LinksContainer>
        </NavigationBar>
    );
};

export default Header;
