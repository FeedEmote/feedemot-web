import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link, top, navigationBar } from './styles.css'

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        {
          isAuthed === true
        ? <ul className={navigationBar}>
            <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
            <div className={top}><span>Feedemot</span></div>
          </ul>
        : <div/>
        }
      </nav>
    </div>
  )
}
