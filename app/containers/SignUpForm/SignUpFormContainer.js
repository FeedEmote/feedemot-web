import React, { PropTypes } from 'react';
import { SignUpForm } from 'components';


const SignUpFormContainer = React.createClass ({
 getInitialState(){
    return {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    }
  },

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  },

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
  },


  render () {
    return <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
  }

})

export default SignUpFormContainer;