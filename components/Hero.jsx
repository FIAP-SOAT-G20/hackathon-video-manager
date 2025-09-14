import React from 'react';

import Logo from './Logo';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    <Logo testId="Hero" />
    <h1 className="mb-4" data-testid="hero-title">
      Video Manager
    </h1>

    <p className="lead" data-testid="hero-lead">
      This is an application that allow users to manage their own videos
    </p>
  </div>
);

export default Hero;
