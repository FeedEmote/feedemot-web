import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { whiteBtn, sectionHeader } from 'sharedStyles/styles.css'




const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className={sectionHeader} >Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div>
        <TextField
          floatingLabelText="Email"
          name="signinemail"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="signinpassword"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div>
        <button type='submit' className={whiteBtn}>{'Sign Up'}</button>
      </div>
    </form>
  </div>
);
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm