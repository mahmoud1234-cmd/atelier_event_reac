import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { RootLayout } from './Components/RootLayout';
import { NotFound } from './Components/NotFound';

// Lazy load EventDetails component
const EventDetails = lazy(() => import('./Components/EventDetails'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="container py-5 text-center">
    <p>Chargement...</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/events',
        element: <App />,
      },
      {
        path: '/event/:eventName',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EventDetails />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <div className="container py-5">
            <h1 className="mb-4">À propos</h1>
            <p className="fs-5 text-muted">
              ESPRIT Events Management - Plateforme de gestion d'événements pour les clubs de l'école ESPRIT.
            </p>
          </div>
        ),
      },
      {
        path: '/contact',
        element: (
          <div className="container py-5">
            <h1 className="mb-4">Contact</h1>
            <p className="fs-5 text-muted">
              Pour nous contacter, envoyez un email à: events@esprit.tn
            </p>
          </div>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
