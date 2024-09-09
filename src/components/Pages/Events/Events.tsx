import React, { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { UpcomingEvents, VenueEvent, SocialLinks } from '../../../models/Event';
import EventStyles from './Event.style';
import EventCountdown from './EventCountdown/EventCountdown';
import MapLinks from './MapLinks/MapLinks';

const Events: React.FC = () => {
    const [expandedEvents, setExpandedEvents] = useState<number[]>([]); // Track multiple expanded events
    const { EventContainer, EventHeader, EventName, EventDetails, WebsiteContainer, SocialLinksContainer } = EventStyles;

    // Get current date
    const currentDate = new Date();

    // Filter upcoming events to exclude past events
    const filteredEvents = UpcomingEvents.filter(event => {
        const eventDate = new Date(event.ISODateOfEvent);
        return eventDate >= currentDate;
    });

    useEffect(() => {
        if (filteredEvents.length === 1) {
            setExpandedEvents([0]); // Automatically expand the single event if there's only one
        }
    }, [filteredEvents]);

    // Toggle expand for multiple events
    const toggleExpand = (index: number) => {
        if (expandedEvents.includes(index)) {
            setExpandedEvents(expandedEvents.filter(i => i !== index)); // Collapse if already expanded
        } else {
            setExpandedEvents([...expandedEvents, index]); // Expand if not already expanded
        }
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

    const generateEventLinks = (event: VenueEvent): JSX.Element => {
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
            {filteredEvents.map((event, index) => (
                <EventContainer
                    key={index}
                    style={{
                        overflow: filteredEvents.length === 1 ? 'hidden' : 'auto',
                    }}
                >
                    <EventHeader
                        imageUrl={event.eventUrls.imageUrl}
                        onClick={() => toggleExpand(index)}
                        style={{
                            cursor: filteredEvents.length === 1 ? 'default' : 'pointer',
                        }}
                    >
                        {event.eventUrls.imageUrl ? (
                            <img src={event.eventUrls.imageUrl} alt={event.name} />
                        ) : (
                            <EventName>{event.name}</EventName>
                        )}
                    </EventHeader>
                    {expandedEvents.includes(index) && (
                        <EventDetails>
                            <EventCountdown dateOfEvent={event.ISODateOfEvent} message={event.countdownEventMessage} spanOfEvent={3} />
                            <p>{event.description}</p>
                            {generateEventLinks(event)}
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
