import styled from 'styled-components';

const Container = styled.div`
    font-size: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 20px;
`;

const LocationName = styled.p`
    margin: 0;
    font-size: 1em;
`;

const LinksContainer = styled.div`
    margin-top: 5px; /* Add some space between the location name and the links */
`;

const StyledLink = styled.a`
    color: #007bff;
    text-decoration: none;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const MapLinkStyles = {
    Container,
    LocationName,
    LinksContainer,
    StyledLink
};
