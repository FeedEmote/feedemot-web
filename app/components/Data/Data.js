import React, { PropTypes } from 'react'
import { dataSection,header } from './styles.css'
import { Emotion } from 'components'

Data.propTypes = {
  data: PropTypes.object.isRequired,
}

export default function Data ({data}) {
  return (
    <div className={dataSection}>
      <div className={header}>{'Data'}</div>
      {
        Object.keys(data).map((key) => {
        return <Emotion key={key} emotion={key} value={data[key]}/>
      })}
    </div>
  )
}
