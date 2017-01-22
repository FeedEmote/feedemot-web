import React, { PropTypes } from 'react'
import { button, text } from './styles.css'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
}

export default function FacebookAuthButton ({onAuth}) {
  return (
    <button onClick={onAuth} className={button}>
      <img src="https://www.facebook.com/rsrc.php/v3/yk/r/mDRwtnJueyz.png" alt="" width="18" height="18"/>
      <span className={text}>{'Login with Facebook'}</span>
    </button>
  )
}

