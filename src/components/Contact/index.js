import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const refForm = useRef()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  
    return () => {
      clearTimeout(timeoutId)
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
    .sendForm(
      'default_service',
      'template_v5mxj4o',
      refForm.current,
      '82Q-V6zyKwwLs4O9H'
    )
    .then(
      () => {
        alert('Your message has been sent successfully!')
        window.location.reload(false)
      },
      () => {
        alert('Your message could not be sent. Please try again.')
      }
    )
  }

  return (
    <>
    <div className="container contact-page">
      <div className="text-zone">
        <h1>
          <AnimatedLetters
          letterClass={letterClass} 
          strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e']}
          idx={15}
          />
        </h1>
        <p>
          I am interested in freelance and full-time opportunities - especially ambitious or large projects. 
          However, if you have other requests or questions, don't hesitate to use the form below.
        </p>
        <div className='contact-form'>
          <form ref={refForm} onSubmit={sendEmail}>
            <ul>
              <li className='half'>
                <input type="text" name="name" placeholder="Name" required />
              </li>
              <li className='half'>
                <input type="email" name="email" placeholder="Email" required />
              </li>
              <li>
                <input type="text" name="subject" placeholder="Subject" required />
              </li>
              <li>
                <textarea name="message" placeholder="Message" required></textarea>
              </li>
              <li>
                <input type="submit" className="flat-button" value="Send" />
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className='info-map'>
        Tanner Mills,
        <br />
        White City, OR 97503 <br />
        <span>Tanner.e.mills@gmail.com</span>
      </div>
      <div className='map-wrap'>
        <MapContainer center={[42.431736853476615, -122.83511990629827]} zoom={13}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <Marker position={[42.431736853476615, -122.83511990629827]}>
            <Popup>Tanner lives in this city.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
    <Loader type="pacman" />
    </>
  )
}

export default Contact