import React, { PropTypes } from 'react'
import { centeredContainer, largeHeader, subHeader, errorMsg } from 'sharedStyles/styles.css'
import { loginContainer, socialSignIn } from './styles.css'
import { GoogleAuthButton, FacebookAuthButton, Loading } from 'components'
import { LoginFormContainer, SignUpFormContainer } from 'containers'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Authenticate ({error, isFetching, onAuth}) {
  return isFetching
      ? <Loading/>
      : <div className={centeredContainer}>
        <h1 className={largeHeader}>{'Feedemot'}</h1>
        <h2 className={subHeader}>{'Real time audience emotional feedback analysis'}</h2>
        <div className={loginContainer}>
          <div className={socialSignIn}>
            <GoogleAuthButton onAuth={onAuth} />
            <FacebookAuthButton onAuth={onAuth}/>
          </div>
          {error&!isFetching ? <p className={errorMsg}>{error}</p> : null}
          <LoginFormContainer/>
          <SignUpFormContainer/>
        </div>

      </div>
}
