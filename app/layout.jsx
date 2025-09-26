'use client';

import './globals.css';
import NavBar from '../components/NavBar';
import { Container } from 'reactstrap';
import Footer from '../components/Footer';
import React from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { DarkModeProvider } from '../contexts/DarkModeContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Auth0Provider>
          <DarkModeProvider>
            <main id="app" className="d-flex flex-column h-100" data-testid="layout">
              <NavBar />
              <Container className="flex-grow-1 mt-5">{children}</Container>
            </main>
          </DarkModeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
