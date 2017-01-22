import React, { PropTypes } from 'react'
import { Dashboard } from 'components'
import { database, firebaseAuth } from 'config/constants'

const DashboardContainer = React.createClass({

  getInitialState () {
    return {
      data: {},
      tips: "",
    }
  },

  componentDidMount () {
    // get the data reference for the current user
    var dataRef = database.ref('users/' + firebaseAuth().currentUser.uid + '/presentation/data')
    var dataRefTips = database.ref('users/' + firebaseAuth().currentUser.uid + '/presentation/tip')
    var that = this
    // when firebase database is updated, update state
    dataRef.on('value', function (snapshot) {
      that.setState({'data': snapshot.val()})
    })
    dataRefTips.on('value', function (snapshot) {
      that.setState({'tips': snapshot.val()})
    })
  },
  render () {
    return (
      <Dashboard data={this.state.data} tips={this.state.tips}/>
    )
  },
})
export default DashboardContainer
