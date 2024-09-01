import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderStyles } from './Header.style';
import { isUserUsingMobile } from '../../utils/browserUtils';

const Header: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const burgerMenuRef = useRef<HTMLDivElement>(null);
    const linksContainerRef = useRef<HTMLUListElement>(null); // Updated to HTMLUListElement

    const { NavigationBar, LinkOption, LogoText, LinksContainer, BurgerMenu, LogoImage, LogoWrapper } = HeaderStyles;

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

    const handleClickOutside = (event: MouseEvent) => {
        if (
            burgerMenuRef.current &&
            !burgerMenuRef.current.contains(event.target as Node) &&
            linksContainerRef.current &&
            !linksContainerRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <NavigationBar>
            {!isUserUsingMobile() ? (
                <LogoWrapper>
                    <LogoImage
                        src="http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg"
                        alt=""
                    />
                </LogoWrapper>
            ) : (
                <LogoText>Rico Creations</LogoText>
            )}
            <BurgerMenu ref={burgerMenuRef} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <LinksContainer ref={linksContainerRef} isOpen={isMenuOpen}>
                {pages.map((page) => (
                    <LinkOption key={page.path} className={location.pathname === page.path ? 'active' : ''}>
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
