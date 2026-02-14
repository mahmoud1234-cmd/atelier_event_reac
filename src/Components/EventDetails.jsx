import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Image, Badge } from 'react-bootstrap';
import eventsData from '../events.json';

export function EventDetails() {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Décoder le nom de l'événement et le chercher dans les données
    const decodedName = decodeURIComponent(eventName);
    setTimeout(() => {
      const foundEvent = eventsData.find(e => e.name.toLowerCase() === decodedName.toLowerCase());
      setEvent(foundEvent);
      setLoading(false);
    }, 300);
  }, [eventName]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Chargement des détails de l'événement...</p>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container className="py-5 text-center">
        <h2>Événement non trouvé</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Retourner à la liste
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button 
        variant="secondary" 
        onClick={() => navigate('/')} 
        className="mb-4"
      >
        ← Retour à la liste
      </Button>

      <Row>
        <Col md={6}>
          <Image 
            src={event.image || '/src/assets/placeholder.jpg'} 
            alt={event.name}
            fluid
            rounded
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Col>

        <Col md={6}>
          <h1 className="mb-3">{event.name}</h1>
          
          <div className="mb-4">
            <p className="text-muted fs-5">{event.description}</p>
          </div>

          <div className="mb-4 p-3 bg-light rounded">
            <Row className="mb-3">
              <Col>
                <h5 className="text-primary">Prix</h5>
                <p className="fs-4 fw-bold">{event.price} TND</p>
              </Col>
              <Col>
                <h5 className="text-success">Billets disponibles</h5>
                <p className="fs-4 fw-bold">{event.nbTickets}</p>
              </Col>
            </Row>

            <Row>
              <Col>
                <h5 className="text-info">Participants</h5>
                <p className="fs-4 fw-bold">{event.nbParticipants}</p>
              </Col>
              <Col>
                <h5 className="text-warning">Taux d'occupation</h5>
                <p className="fs-4 fw-bold">
                  {((event.nbParticipants / (event.nbParticipants + event.nbTickets)) * 100).toFixed(0)}%
                </p>
              </Col>
            </Row>
          </div>

          {event.nbTickets === 0 ? (
            <Badge bg="danger" className="fs-6 py-2 px-3">
              ✗ Sold Out
            </Badge>
          ) : event.nbTickets < 5 ? (
            <Badge bg="warning" className="fs-6 py-2 px-3 text-dark">
              ⚠ Peu de places disponibles ({event.nbTickets})
            </Badge>
          ) : (
            <Badge bg="success" className="fs-6 py-2 px-3">
              ✓ Places disponibles
            </Badge>
          )}

          <div className="mt-4">
            <Button 
              variant="primary" 
              size="lg"
              disabled={event.nbTickets === 0}
              className="w-100"
            >
              {event.nbTickets === 0 ? 'Sold Out' : 'Réserver maintenant'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
