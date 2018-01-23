import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './components/Form';


class App extends Component {
    constructor(props) {
        super(props);
        // this.askAutorization();
        this.state = this.props;
    }

    changeLogin(e) {
        this.props.onChangeLogin(e);
        let login = this.props.eventList.login.login;
        if (login.value.length > 0) {
            let errData = {
                className: '',
                content: ''
            };
            this.props.onShowLoginError(errData)
        }
    }

    changePassword(e) {
        this.props.onChangePassword(e);
        let password = this.props.eventList.login.password;
        if (password.value.length > 0) {
            let errData = {
                className: '',
                content: ''
            };
            this.props.onShowPasswordError(errData)
        }
    }

    validateForm(e, scenario) {
        console.log(scenario);
        e.preventDefault();
        let login = this.props.eventList.login.login;
        let password = this.props.eventList.login.password;
        if (login.value.length < 1) {
            let errData = {
                className: 'error',
                content: 'Enter Username'
            };
            this.props.onShowLoginError(errData)
        } else {
            let errData = {
                className: '',
                content: ''
            };
            this.props.onShowLoginError(errData)
        }
        if (password.value.length < 1) {
            let errData = {
                className: 'error',
                content: 'Enter Password'
            };
            this.props.onShowPasswordError(errData)
        } else {
            let errData = {
                className: '',
                content: ''
            };
            this.props.onShowPasswordError(errData)
        }
        return
    }

    submitLoginForm(data) {
        console.log(data)
    }

    submitRegistrationForm(data) {
        console.log(data)
    }

    askAutorization() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/autorised", true); // false for synchronous request
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log(xhr.responseText);
            } else {
                console.log(xhr.responseText);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <Form
                    changeLogin={this.changeLogin.bind(this)}
                    changePassword={this.changePassword.bind(this)}
                    validateForm={this.validateForm.bind(this)}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        eventList: state
    }),
    dispatch => ({
        onChangeLogin: (data) => {
            dispatch({type: 'CHANGE_LOGIN', payload: data.target.value});
        },
        onChangePassword: (data) => {
            dispatch({type: 'CHANGE_PASSWORD', payload: data.target.value});
        },
        onShowLoginError: (data) => {
            dispatch({type: 'LOGIN_ERROR', payload: data});
        },
        onShowPasswordError: (data) => {
            dispatch({type: 'PASSWORD_ERROR', payload: data});
        }
    })
)(App);