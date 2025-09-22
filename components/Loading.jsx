import React from 'react';

const Loading = () => (
  <div className="spinner d-flex align-items-center justify-content-center w-100 h-100" data-testid="loading">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      className="uil-ring"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#337ab7"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="251.2"
        strokeDashoffset="62.8">
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 50 50"
          repeatCount="indefinite"
          to="360 50 50"
          type="rotate"></animateTransform>
      </circle>
    </svg>
  </div>
);

export default Loading;
