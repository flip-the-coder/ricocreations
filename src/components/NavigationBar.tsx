import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../logo.svg';

const NavigationBar = () => {
    const pages = [
        <Link href="/home">Home </Link>,
        <Link href="/dispensary">Dispensary </Link>,
        <Link href="/aboutMe">About </Link>
        // <Link href="/cbd101">CBD 101 </Link>,
        // <Link href="/contact">Contact </Link>
    ];
    return (
        <>
            <Header>
                <Logo src={logo} alt="logo" />
                {pages.map}
            </Header>
        </>
    );
};

export default NavigationBar;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Header = styled.div`
    background-color: pink;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    height: 10%;
`;

const Logo = styled.img`
    height: 50%;
    pointer-events: none;
    justify-content: left;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${spin} infinite 20s linear;
    }
`;

const Link = styled.a`
    margin-right: 10px; /* Adjust the margin as needed */
    text-decoration: none;
    color: blue; /* Set the desired link color */
`;
