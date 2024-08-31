import React, { useEffect, useState } from 'react';
import EventCountdownStyles from './EventCountdown.style';

const calculateTimeLeft = (dateOfEvent: string) => {
  const now = new Date();
  const eventDate = new Date(dateOfEvent);
  const difference = +eventDate - +now;
  let timeLeft: { [key: string]: number } = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

const EventCountdown: React.FC<{ dateOfEvent: string; message: string | null; spanOfEvent: number | null }> = ({ dateOfEvent, message, spanOfEvent }) => {
  const { Container, Message, Timer } = EventCountdownStyles;
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(calculateTimeLeft(dateOfEvent));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(dateOfEvent));
    }, 1000);

    return () => clearInterval(interval);
  }, [dateOfEvent]);

  const timerComponents: React.ReactNode[] = [];

  Object.keys(timeLeft).forEach(interval => {
    if (timeLeft[interval] === undefined || timeLeft[interval] === 0) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const generateDateSpanMessage = (): JSX.Element | null => {
    if (spanOfEvent === null || isNaN(spanOfEvent)) return null;
  
    const startDate = new Date(dateOfEvent); // The start date of the event
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + (spanOfEvent || 0));
  
    // Format the dates to exclude year and time
    const startDateStr = startDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
    const eventDateStr = eventDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  
    return (
      <Message>{`${startDateStr} - ${eventDateStr}`}</Message>
    );
  };
  

  return (
    <Container>
      {message && <Message>{message}</Message>}
      {generateDateSpanMessage()}
      <br />
      {timerComponents.length ? (
        <Timer>{timerComponents}</Timer>
      ) : (
        <Timer>Time's up!</Timer>
      )}
    </Container>
  );
};

export default EventCountdown;
