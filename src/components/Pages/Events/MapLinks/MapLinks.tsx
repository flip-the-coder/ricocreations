import React from 'react';
import {isIphone} from '../../../../utils/browserUtils'

const MapLinks: React.FC<{ address: string, locationName: string }> = ({ address, locationName }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  return (
    <p>
        {locationName + ": "}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
      {' '}
      { isIphone() && <a
        href={appleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Apple Maps
      </a> }
    </p>
  );
};

export default MapLinks;
