import React, { PropTypes } from 'react'
import { LoginForm } from 'components'


const LoginFormContainer = React.createClass ({

  getInitialState(){
    return {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    }
  },

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
  },

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  },

  render () {
    return <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
  }

})

export default LoginFormContainer