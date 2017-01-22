import React, { PropTypes } from 'react'
import { Dashboard } from 'components'
import { database, firebaseAuth } from 'config/constants'

const DashboardContainer = React.createClass({

  getInitialState () {
    return {
      data: {},
    }
  },

  componentDidMount () {
    // get the data reference for the current user
    var dataRef = database.ref('users/' + firebaseAuth().currentUser.uid + '/presentation/data')
    var that = this
    // when firebase database is updated, update state
    dataRef.on('value', function (snapshot) {
      that.setState({'data': snapshot.val()})
      // console.log('data', that.state.data)
    })
  },
  render () {
    return (
      <Dashboard data={this.state.data}/>
    )
  },
})
export default DashboardContainer
