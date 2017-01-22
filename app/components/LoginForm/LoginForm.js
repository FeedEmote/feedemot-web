import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { container, forgot, forgotContainer} from './styles.css'
import { whiteBtn, sectionHeader } from 'sharedStyles/styles.css'

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default function LoginForm ({
  onSubmit,
  onChange,
  errors,
  user
}) {
  return <div className={container}>
    <form action="/" onSubmit={onSubmit}>
      <h2 className={sectionHeader}>Login</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="loginemail"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="loginpassword"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>
      <div className="button-line">
        <button className={whiteBtn} type="submit"> {"Log in"}</button>
      </div>
      <div className={forgotContainer}><p className={forgot}>Forgot Password?</p></div>
    </form>
  </div>

};


