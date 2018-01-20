import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  render() {
    let buttonsData = this.props.eventList.buttons;
    return (
      <div className="login-form"></div>
    );
  }
}

export default connect(
  state => ({
    eventList: state
  }),
  dispatch => ({})
)(Login);