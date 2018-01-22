import React, {Component} from 'react';
import {connect} from 'react-redux';

class Form extends Component {
    render() {
        let formData = this.props.eventList.login;
        return (
            <div className="start_form">
                <p className="calendar_logo"></p>
                <p className="calendar_title"></p>
                <form className="login_form">
                    <label htmlFor="login_input" id="login_input_label">Username</label>
                    <input type="text" id="login_input" onChange={(e) => {
                        this.props.changeLogin(e)
                    }}/>
                    <p className={formData.login_error.className}>
                        {formData.login_error.content}
                    </p>
                    <label htmlFor="login_input" id="password_input_label">Password</label>
                    <input type="text" id="password_input" onChange={(e) => {
                        this.props.changePassword(e)
                    }}/>
                    <p className={formData.password_error.className}>
                        {formData.password_error.content}
                    </p>
                    <button onClick={(e) => {
                        this.props.validateForm(e, 'Sign in')
                    }}>Sign in
                    </button>
                    <button onClick={(e) => {
                        this.props.validateForm(e, 'Sign up')
                    }}>Sign up
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        eventList: state
    }),
    dispatch => ({})
)(Form);