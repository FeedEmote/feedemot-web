import React, { PropTypes } from 'react'
import { emoji, container, emotionName, bar, innerBar, outerBar } from './styles.css'

Emotion.propTypes = {
  emotion: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

function getEmoji (emotion) {
  switch(emotion) {
    case 'anger':
      return '😡'
    case 'contempt':
      return '☺️'
    case 'disgust':
      return '🤢'
    case 'engagement':
      return '🤔'
    case 'fear':
      return '😨'
    case 'joy':
      return '😃'
    case 'sadness':
      return '🙁'
    case 'surprise':
      return '😲'
    case 'valence':
      return '😏'
    default:
      return '😐'
  }
}

export default function Emotion ({emotion, value}) {
  return (
    <div className={container}>
      <div className={emoji}>{getEmoji(emotion)}</div>
      <div className={emotionName}>{emotion}</div>
      <div className={bar}>
        <div className={outerBar}/>
        <div className={innerBar} style={{width : value + '%'}}/>
      </div>
    </div>
  )
}
