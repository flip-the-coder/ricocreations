import React from 'react';
import {isIphone} from '../../../../utils/browserUtils';
import {MapLinkStyles} from './MapLinks.style';

const MapLinks: React.FC<{ address: string, locationName: string }> = ({ address, locationName }) => {
  const {Container, StyledParagraph, StyledLink} = MapLinkStyles
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  return (
    <Container>
      <StyledParagraph>
        {locationName + ": "}
        <StyledLink
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </StyledLink>
        {' '}
        {isIphone() && (
          <StyledLink
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Apple Maps
          </StyledLink>
        )}
      </StyledParagraph>
    </Container>
  );
};

export default MapLinks;
