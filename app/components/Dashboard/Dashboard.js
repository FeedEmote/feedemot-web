import React, { PropTypes } from 'react'
import { headline, mainSection, dataSection, tipsSection } from './styles.css'
import { Tips, Data } from 'components'

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default function Dashboard ({data}) {
  return (
    <div>
      <div className={headline}>{'Real-time analysis'}</div>
      <div className={mainSection}>
        <Data data={data}/>
        <Tips/>
      </div>
    </div>
  )
}
