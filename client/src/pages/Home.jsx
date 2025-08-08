import React from "react";

const Home = () => {
  return (
    <div>
      <svg
        width="220"
        height="60"
        viewBox="0 0 220 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle cx="30" cy="30" r="22" stroke="#22C55E" stroke-width="4" />
          <path
            d="M40 40 L54 54"
            stroke="#22C55E"
            stroke-width="4"
            stroke-linecap="round"
          />
          <polygon points="54,54 49,47 58,47" fill="#22C55E" />
        </g>

        <text
          x="68"
          y="40"
          font-family="Segoe UI, Arial, sans-serif"
          font-size="34"
          fill="#222"
          font-weight="600"
          letter-spacing="2"
        >
          Quicklyne
        </text>
      </svg>
    </div>
  );
};

export default Home;
