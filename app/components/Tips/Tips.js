import React, { PropTypes } from 'react'
import { tipsSection, tipsTitle, text } from './styles.css'

Tips.propTypes = {
  tips : PropTypes.string.isRequired,
}

export default function Tips ({tips}) {
  return (
    <div className={tipsSection}>
      <div className={tipsTitle}>{'Tips'}</div>
      <div className={text}>{tips}</div>
    </div>
  )
}
