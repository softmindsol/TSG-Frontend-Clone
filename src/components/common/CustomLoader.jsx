import React from "react";
import styled from "styled-components";

const CustomLoader = () => {
  return (
    <StyledWrapper>
      <div>
        <div className="jelly-triangle">
          <div className="jelly-triangle__dot" />
          <div className="jelly-triangle__traveler" />
        </div>
        <svg width={0} height={0} className="jelly-maker">
          <defs>
            <filter id="uib-jelly-triangle-ooze">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7.3"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="ooze"
              />
              <feBlend in="SourceGraphic" in2="ooze" />
            </filter>
          </defs>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .jelly-triangle {
    --uib-size: 2.8rem;
    --uib-speed: 1.75s;
    --uib-color: #183153;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
    filter: url("#uib-jelly-triangle-ooze");
  }

  .jelly-triangle__dot,
  .jelly-triangle::before,
  .jelly-triangle::after {
    content: "";
    position: absolute;
    width: 33%;
    height: 33%;
    background: var(--uib-color);
    border-radius: 100%;
    box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
  }

  .jelly-triangle__dot {
    top: 6%;
    left: 30%;
    animation: grow7132 var(--uib-speed) ease infinite;
  }

  .jelly-triangle::before {
    bottom: 6%;
    right: 0;
    animation: grow7132 var(--uib-speed) ease calc(var(--uib-speed) * -0.666)
      infinite;
  }

  .jelly-triangle::after {
    bottom: 6%;
    left: 0;
    animation: grow7132 var(--uib-speed) ease calc(var(--uib-speed) * -0.333)
      infinite;
  }

  .jelly-triangle__traveler {
    position: absolute;
    top: 6%;
    left: 30%;
    width: 33%;
    height: 33%;
    background: var(--uib-color);
    border-radius: 100%;
    animation: triangulate6214 var(--uib-speed) ease infinite;
  }

  .jelly-maker {
    width: 0;
    height: 0;
    position: absolute;
  }

  @keyframes triangulate6214 {
    0%,
    100% {
      transform: none;
    }

    33.333% {
      transform: translate(120%, 175%);
    }

    66.666% {
      transform: translate(-95%, 175%);
    }
  }

  @keyframes grow7132 {
    0%,
    100% {
      transform: scale(1.5);
    }

    20%,
    70% {
      transform: none;
    }
  }
`;

export default CustomLoader;
