import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.context.router.replace('dashboard')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  },
  render () {
    return this.props.isFetching === true
    ? null
    : <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className={container}>
          <Navigation isAuthed={this.props.isAuthed}/>
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>

  },
})

export default connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
  }, dispatch)
   )(MainContainer)
