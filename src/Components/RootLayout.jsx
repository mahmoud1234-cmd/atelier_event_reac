import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './Navbar';

export function RootLayout() {
  return (
    <>
      <NavigationBar />
      <main>
        <Suspense fallback={<div className="container py-5 text-center"><p>Chargement...</p></div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
