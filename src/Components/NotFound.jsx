import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="py-5 text-center">
      <Image 
        src="/src/assets/notfound.jfif" 
        alt="404 Not Found" 
        fluid
        style={{ maxWidth: '500px', marginBottom: '20px' }}
      />
      <h1 className="mb-4">404 - Page Not Found</h1>
      <p className="text-muted fs-5 mb-4">
        La page que vous recherchez n'existe pas ou a été supprimée.
      </p>
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => navigate('/')}
      >
        Retourner à l'accueil
      </Button>
    </Container>
  );
}
