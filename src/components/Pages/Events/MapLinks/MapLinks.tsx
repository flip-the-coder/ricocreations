import React from 'react';
import { isIphone } from '../../../../utils/browserUtils';
import { MapLinkStyles } from './MapLinks.style';

const MapLinks: React.FC<{ address: string; locationName: string }> = ({ address, locationName }) => {
    const { Container, LocationName, LinksContainer, StyledLink } = MapLinkStyles;
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

    return (
        <Container>
            <LocationName>{locationName}</LocationName>
            <LinksContainer>
                <StyledLink href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                </StyledLink>
                {isIphone() && (
                    <StyledLink href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
                        Open in Apple Maps
                    </StyledLink>
                )}
            </LinksContainer>
        </Container>
    );
};

export default MapLinks;
