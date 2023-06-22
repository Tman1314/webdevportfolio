import './index.scss'
import React, { useState, createRef, useEffect } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'

const Logo = (props) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });
  const pathRef = createRef();
  const [pathLength, setPathLength] = useState();

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathRef]);
  return (
    <Wrapper
    className={"logo-container"}
    ref={inViewRef}
    pathLength={pathLength}
    >
      <svg
        className={inView ? 'animated visible' : 'animated'}
        viewBox='0 0 559 897'
        {...props}
      >
        <g
          aria-label="T"
          style={{
            fontWeight: 700,
            fontSize: '335.158px',
            fontFamily: '&quot',
            InkscapeFontSpecification: '&quot',
            fill: '#022c43',
            fillOpacity: 1,
            fillRule: 'evenodd',
            stroke: 'gold',
            strokeWidth: 1.29547,
            strokeOpacity: 1,
          }}
        >
          <path
            d="m.827 1.434 247.682 4.357v100.547l-83.79-13.741 23.126 157.86H67.86l18.098-157.86L.827 88.24Z"
            style={{
              fill: '#022c43',
              fillOpacity: 1,
              stroke: 'gold',
              strokeWidth: 3.25047781,
              strokeDasharray: 'none',
              strokeOpacity: 1,
            }}
            transform="matrix(.76377 0 0 1.11529 57.62 274.875)"
          />
          <path
            d="m156.725 302.237 109.014-201.843h64.431l21.375 61.072 37.865-61.378 57.103-1.221 62.599 219.554-81.532 6.718-15.573-55.575-18.627-53.744-56.187 50.08-43.056-57.103-51.606 109.624-85.806-16.184z"
            style={{
              fontWeight: 700,
              fontSize: '305.361px',
              fontFamily: '&quot',
              InkscapeFontSpecification: '&quot',
              fill: '#022c43',
              fillOpacity: 1,
              fillRule: 'evenodd',
              stroke: 'gold',
              strokeWidth: 3.25047781,
              strokeOpacity: 1,
              opacity: 1,
              strokeDasharray: 'none',
            }}
            transform="translate(57.62 274.875) scale(.92294)"
          />
        </g>
        <ellipse
          cx={279.93}
          cy={447.627}
          fill="none"
          rx={277.373}
          ry={291.348}
          style={{
            opacity: 1,
            fill: '#022c43',
            fillOpacity: 0,
            fillRule: 'evenodd',
            stroke: 'gold',
            strokeWidth: 3.87333,
            strokeDasharray: 'none',
            strokeOpacity: 1,
          }}
        />
      </svg>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  .animated {
    min-width: 559px;
    max-width: 559px;
    min-height: 897px;
    max-height: 897px;
    width: 100%;
    height: 100px;
    stroke-dasharray: ${(props) => props.pathLength};
    stroke-dashoffset: ${(props) => props.pathLength};
  }

  .animated.visible {
    animation: draw 6s linear forwards !important;
  }

  @keyframes draw {
    from {
      stroke-dashoffset: ${(props) => props.pathLength};
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export default Logo
