import React, { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { UpcomingEvents, VenueEvent, SocialLinks } from '../../../models/Event';
import EventStyles from './Event.style';
import EventCountdown from './EventCountdown/EventCountdown';
import MapLinks from './MapLinks/MapLinks';

const Events: React.FC = () => {
    const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
    const { EventContainer, EventHeader, EventName, EventDetails, WebsiteContainer, SocialLinksContainer } = EventStyles;

    useEffect(() => {
        UpcomingEvents.length === 1 && setExpandedEvent(0);
    }, []);

    const toggleExpand = (index: number) => {
        UpcomingEvents.length > 1 && setExpandedEvent(expandedEvent === index ? null : index)
    };

    const generateSocialLinks = (socialLinks: SocialLinks): JSX.Element => {
        const { twitter, instagram, facebook, youtube } = socialLinks;
        return (
            <SocialLinksContainer>
                {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                )}
                {instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                )}
                {facebook && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                )}
                {youtube && (
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                )}
            </SocialLinksContainer>
        );
    };

    const generateLinkContainer = (event: VenueEvent): JSX.Element => {
        const { eventUrl, ticketUrl } = event.eventUrls;

        return (
            <WebsiteContainer>
                {eventUrl && (
                    <a href={eventUrl} target="_blank" rel="noopener noreferrer">
                        {event.name}
                    </a>
                )}
                {ticketUrl && (
                    <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                        {`: Tickets`}
                    </a>
                )}
            </WebsiteContainer>
        );
    };

    return (
        <div>
            {UpcomingEvents.map((event, index) => (
                <EventContainer
                    key={index}
                    style={{
                        height: UpcomingEvents.length === 1 && expandedEvent === index ? '100vh' : 'auto',
                        overflow: UpcomingEvents.length === 1 ? 'hidden' : 'auto',
                    }}
                >
                    <EventHeader
                        imageUrl={event.eventUrls.imageUrl}
                        onClick={() => toggleExpand(index)}
                        style={{
                            cursor: UpcomingEvents.length === 1 ? 'default' : 'pointer',
                        }}
                    >
                        {event.eventUrls.imageUrl ? (
                            <img src={event.eventUrls.imageUrl} alt={event.name} />
                        ) : (
                            <EventName>{event.name}</EventName>
                        )}
                    </EventHeader>
                    {expandedEvent === index && (
                        <EventDetails>
                            <EventCountdown dateOfEvent={event.ISODateOfEvent} message={event.countdownEventMessage} spanOfEvent={3} />

                            <p>{event.description}</p>
                            
                            {generateLinkContainer(event)}
                            <MapLinks address={event.address} locationName={event.locationName} />
                            {generateSocialLinks(event.eventUrls.socialLinks)}
                        </EventDetails>
                    )}
                </EventContainer>
            ))}
        </div>
    );
};

export default Events;
