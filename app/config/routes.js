import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import { MainContainer, HomeContainer, AuthenticateContainer, DashboardContainer, LogoutContainer, UserContainer } from 'containers'
import { checkIfAuthed } from 'helpers/auth'
import { NotFound, Loading } from 'components'

export default function getRoutes (store = {}, history = {browserHistory}) {

  const NotAthed = UserAuthWrapper({
    authSelector: state => state.users,
    authenticatingSelector: state => state.users.isFetching,
    predicate: user => user.isAuthed === false,
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/dashboard',
    allowRedirectBack: false,
    LoadingComponent: Loading,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'NotAthed',
  })

  const Authed = UserAuthWrapper({
    authSelector: state => state.users,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'Authed',
    LoadingComponent: Loading,
    // Want to redirect the user when they are done loading and authenticated
    predicate: user => user.isAuthed && user.isFetching === false,
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
    allowRedirectBack: false,
  })

  return (
  <Router history={history}>
    <Router path ='/' component={MainContainer}>
      <Route path='logout' component = {Authed(LogoutContainer)}/>
      <IndexRoute component={NotAthed(AuthenticateContainer)} />
      <Route path='dashboard' component={Authed(DashboardContainer)}/>
      <Route path='*' component = {Authed(NotFound)} status={404}/>
    </Router>
  </Router>
  )
}

