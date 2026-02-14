import React, { useState } from 'react';
import { Card, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Default placeholder image URL
const DEFAULT_PLACEHOLDER = '/src/assets/placeholder.jpg';

export function Event({ event, onBook, onLike }) {
  const [like, setLike] = useState(event.like || false);
  const [showAlert, setShowAlert] = useState(false);

  const handleBook = () => {
    setShowAlert(true);
    onBook(event.id);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleLike = () => {
    setLike(!like);
    onLike(event.id, !like);
  };

  const isOutOfStock = event.nbTickets === 0;

  const displayImage = isOutOfStock ? '/src/assets/sold_out.png' : (event.image || DEFAULT_PLACEHOLDER);

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100">
        <Card.Img 
          variant="top" 
          src={displayImage}
          alt={event.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Link 
            to={`/event/${encodeURIComponent(event.name)}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card.Title className="text-primary" style={{ cursor: 'pointer' }}>
              {event.name}
            </Card.Title>
          </Link>
          <Card.Text>{event.description}</Card.Text>
          <div className="mb-2">
            <p className="text-muted mb-1">
              <strong>Price:</strong> ${event.price}
            </p>
            <p className="text-muted mb-1">
              <strong>Available Tickets:</strong> {event.nbTickets}
            </p>
            <p className="text-muted mb-1">
              <strong>Participants:</strong> {event.nbParticipants}
            </p>
          </div>
          
          {isOutOfStock && (
            <Alert variant="danger" className="mb-3">
              Sold Out
            </Alert>
          )}

          {showAlert && (
            <Alert variant="success" className="mb-3">
              You have booked an event
            </Alert>
          )}

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleBook}
              disabled={isOutOfStock}
              className="flex-grow-1"
            >
              Book an event
            </Button>
            <Button
              variant={like ? 'danger' : 'outline-danger'}
              size="sm"
              onClick={handleLike}
            >
              {like ? 'Dislike' : 'Like'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
