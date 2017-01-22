import React, { PropTypes } from 'react'
import { tipsSection } from './styles.css'

Tips.propTypes = {
  // : PropTypes.string.isRequired,
}

export default function Tips (props) {
  return (
    <div className={tipsSection}>{'Tips'}</div>
  )
}
