export interface SocialLinks {
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
    other: string[];
}

export interface EventLinks {
    eventUrl: string;
    ticketUrl: string;
    imageUrl: string;
    socialLinks: SocialLinks;
}

export interface VenueEvent {
    name: string;
    ISODateOfEvent: string; // ISO 8601
    countdownEventMessage: string;
    spanOfEvent: string;
    description: string;
    locationName: string;
    address: string;
    eventUrls: EventLinks;
    lastYearImages: string[];
}

export const UpcomingEvents: VenueEvent[] = [
    {
        name: 'Seismic Dance Event',
        ISODateOfEvent: '2024-11-15T17:00:00-06:00',
        countdownEventMessage: 'SEISMIC DANCE EVENT 7.0 BEGINS IN',
        spanOfEvent: 'NOV 15TH-17TH 2024',
        description: '',
        address: '8509 Burleson Rd, Austin, TX 78719',
        locationName: 'THE CONCOURSE PROJECT',
        eventUrls: {
            eventUrl: 'https://www.seismicdanceevent.com',
            ticketUrl: 'https://wl.seetickets.us/event/Seismic-Dance-Event-70/577432?afflky=seismicdanceevent',
            imageUrl:
                'https://www.seismicdanceevent.com/wp-content/uploads/2024/05/SeismicWebsite-Home_Fall2024_banner_desktop.png',
            socialLinks: {
                twitter: 'https://x.com/SeismicTX',
                instagram: 'https://www.instagram.com/seismicdanceevent',
                facebook: 'https://www.facebook.com/seismicdanceevent',
                youtube: 'https://www.youtube.com/@SeismicDanceEvent',
                other: ['https://soundcloud.com/seismic-dance-event']
            }
        },
        lastYearImages: []
    },
    {
        name: 'Seismic Dance Event',
        ISODateOfEvent: '2024-11-15T17:00:00-06:00',
        countdownEventMessage: 'SEISMIC DANCE EVENT 7.0 BEGINS IN',
        spanOfEvent: 'NOV 15TH-17TH 2024',
        description: '',
        address: '8509 Burleson Rd, Austin, TX 78719',
        locationName: 'THE CONCOURSE PROJECT',
        eventUrls: {
            eventUrl: 'https://www.seismicdanceevent.com',
            ticketUrl: 'https://wl.seetickets.us/event/Seismic-Dance-Event-70/577432?afflky=seismicdanceevent',
            imageUrl:
                'https://www.seismicdanceevent.com/wp-content/uploads/2024/05/SeismicWebsite-Home_Fall2024_banner_desktop.png',
            socialLinks: {
                twitter: 'https://x.com/SeismicTX',
                instagram: 'https://www.instagram.com/seismicdanceevent',
                facebook: 'https://www.facebook.com/seismicdanceevent',
                youtube: 'https://www.youtube.com/@SeismicDanceEvent',
                other: ['https://soundcloud.com/seismic-dance-event']
            }
        },
        lastYearImages: []
    }
];
