import React, { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { Event } from './Event';
import eventsData from '../events.json';

export function Events() {
  const [events, setEvents] = useState(eventsData);
  const [showWelcome, setShowWelcome] = useState(false);

  // Lifecycle: Component did mount
  useEffect(() => {
    console.log('Component mounted');
    
    // Show welcome message after 3 seconds
    const timer = setTimeout(() => {
      console.log('Welcome message displayed');
      setShowWelcome(true);
    }, 3000);

    // Cleanup function (component will unmount)
    return () => {
      clearTimeout(timer);
      console.log('Component will unmount or cleanup');
    };
  }, []); // Empty dependency array means this runs only on mount

  // Lifecycle: Component did update (when events change)
  useEffect(() => {
    console.log('Events updated:', events);
  }, [events]); // Runs whenever events change

  const handleBook = (eventId) => {
    console.log('Booking event:', eventId);
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              nbTickets: Math.max(0, event.nbTickets - 1),
              nbParticipants: event.nbParticipants + 1,
            }
          : event
      )
    );
  };

  const handleLike = (eventId, liked) => {
    console.log('Like event:', eventId, 'Status:', liked);
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, like: liked }
          : event
      )
    );
  };

  // Hide welcome message after 5 seconds (3 seconds to appear + 2 seconds display)
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Welcome to Event Management</h1>
      
      {showWelcome && (
        <Alert variant="info" className="mb-4">
          Welcome to ESPRIT Events Management! Explore and book your favorite events here.
        </Alert>
      )}

      <Row>
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            onBook={handleBook}
            onLike={handleLike}
          />
        ))}
      </Row>
    </Container>
  );
}
