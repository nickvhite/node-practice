import React, {Component} from 'react';
import {connect} from 'react-redux';

class Form extends Component {
    render() {
        let formData = this.props.eventList.login;
        return (
            <div className="start_form">
                <div className="calendar_logo">
                    <p className="calendar_logo_week_day">{formData.days[new Date().getDay()]}</p>
                    <p className="calendar_logo_month_day">{new Date().getDate()}</p>
                </div>
                <p className="calendar_title">
                    Sign in or Sign up to calendar
                </p>
                <form className="login_form">
                    <p
                        className={formData.autorization_error.className}
                    ><span>
                        {formData.autorization_error.content}
                    </span></p>
                    <input
                        type="text"
                        id="login_input"
                        name="login_input"
                        onChange={(e) => {this.props.changeLogin(e)}}
                        value={formData.login.value}
                        className={formData.login.className}
                    />
                    <label htmlFor="login_input" id="login_input_label">Username</label>
                    <p className={formData.login_error.className}><span>
                        {formData.login_error.content}
                    </span></p>
                    <input
                        type="password"
                        id="password_input"
                        name="password_input"
                        onChange={(e) => {this.props.changePassword(e)}}
                        value={formData.password.value}
                        className={formData.password.className}
                    />
                    <label htmlFor="password_input" id="password_input_label">Password</label>
                    <p className={formData.password_error.className}><span>
                        {formData.password_error.content}
                    </span></p>
                    <button onClick={(e) => {
                        this.props.validateForm(e, 'Sign in')
                    }}>Sign in
                    </button>
                    <p className="form_border"><span>Or</span></p>
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