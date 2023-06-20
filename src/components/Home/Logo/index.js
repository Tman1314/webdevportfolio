import './index.scss'
import { useEffect, useRef } from 'react'
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin'
import gsap from 'gsap-trial'

const Logo = () => {
  const bgRef = useRef()
  const outlineLogoTRef = useRef()
  const outlineLogoMRef = useRef()
  const outlineLogoElipseRef = useRef()

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin)

    gsap
      .timeline()
      .to(bgRef.current, {
        duration: 1,
        opacity: 1,
      })
      .from(outlineLogoElipseRef.current, {
        drawSVG: 0,
        duration: 5,
      })

    gsap.fromTo(
      [outlineLogoTRef.current, outlineLogoMRef.current],
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 6,
        duration: 2,
      }
    )
  }, [])

  return (
    <div className="logo-container" ref={bgRef}>
      <svg
        version="1.1"
        id="svg2771"
        width="559"
        height="897"
        viewBox="0 0 559 897"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="svg-container">
          <g
            aria-label="TM"
            transform="matrix(0.76376581,0,0,1.1152902,57.619073,274.87526)"
            id="text"
            style={{
              fontWeight: 'bold',
              fontSize: '335.158px',
              fontFamily: 'Super Mario 256',
              fill: '#022c43',
              fillOpacity: 1,
              fillRule: 'evenodd',
              stroke: '#ffd700',
              strokeWidth: 3.0,
              strokeOpacity: 1,
            }}
          >
            <path
              ref={outlineLogoTRef}
              d="M 0.82690191,1.4340486 248.50866,5.7911025 V 106.3385 l -83.7895,-13.741478 23.1259,157.859408 H 67.8585 L 85.957031,92.597022 0.82690191,88.239968 Z"
              id="t"
              style={{
                fill: '#022c43',
                fillOpacity: 1,
                stroke: '#ffd700',
                strokeWidth: 3.0,
                strokeDasharray: 'none',
                strokeOpacity: 1,
              }}
            />
            <path
              ref={outlineLogoMRef}
              d="M 156.72499,302.23718 265.73887,100.39356 h 64.43116 l 21.37527,61.0722 37.86477,-61.37756 57.1025,-1.221446 62.59901,219.554556 -81.53139,6.71794 -15.57341,-55.5757 -18.62702,-53.74354 -56.18642,50.07921 -43.0559,-57.10251 -51.60601,109.6246 -85.80644,-16.18413 z"
              id="m"
              style={{
                fontWeight: 'bold',
                fontSize: '305.361px',
                fontFamily: 'Super Mario 256',
                fill: '#022c43',
                fillOpacity: 1,
                fillRule: 'evenodd',
                stroke: '#ffd700',
                strokeWidth: 3.0,
                strokeOpacity: 1,
                opacity: 1,
                strokeDasharray: 'none',
              }}
              transform="scale(1.2084087,0.82753459)"
            />
          </g>
          <ellipse
            ref={outlineLogoElipseRef}
            style={{
              opacity: 1,
              fill: '#022c43',
              fillOpacity: 0,
              fillRule: 'evenodd',
              stroke: '#ffd700',
              strokeWidth: 3.0,
              strokeDasharray: 'none',
              strokeOpacity: 1,
            }}
            id="circle"
            ry="291.34814"
            rx="277.37347"
            cy="447.62659"
            cx="279.93036"
          />
        </g>
      </svg>
    </div>
  )
}

export default Logo
