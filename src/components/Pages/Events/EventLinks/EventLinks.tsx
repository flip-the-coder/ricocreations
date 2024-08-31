import React from 'react';
import styled from 'styled-components';

interface EventLinksProps {
  eventUrl?: string;
  ticketUrl?: string;
  eventName?: string;
}

const LinksContainer = styled.div`
  display: flex;
  gap: 10px; /* Adjust spacing as needed */
`;

const EventLinks: React.FC<EventLinksProps> = ({ eventUrl, ticketUrl, eventName }) => {
  return (
    <LinksContainer>
      {eventUrl && (
        <a href={eventUrl} target="_blank" rel="noopener noreferrer">
          {eventName}
        </a>
      )}
      {ticketUrl && (
        <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
          Tickets
        </a>
      )}
    </LinksContainer>
  );
};

export default EventLinks;
