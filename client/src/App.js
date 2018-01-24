import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './components/Form';
import Spinner from './components/Spinner';
import Calendar from './components/Calendar';


class App extends Component {
    constructor(props) {
        super(props);
        this.askAutorization();
    }

    changeLogin(e) {
        this.props.onChangeLogin(e.target.value);
        let errData = "";
        this.props.onShowLoginError(errData);
        this.props.onShowUserError("authorization_not_error");
    }

    changePassword(e) {
        this.props.onChangePassword(e.target.value);
        let errData = "";
        this.props.onShowPasswordError(errData);
        this.props.onShowUserError("authorization_not_error");
    }

    validateForm(e, scenario) {
        e.preventDefault();
        let login = this.props.eventList.login.login;
        let password = this.props.eventList.login.password;
        if(login.value.length < 1 || password.value.length < 1) {
            if (login.value.length < 1) {
                let errData = 'error';
                this.props.onShowLoginError(errData);
            }
            if (password.value.length < 1) {
                let errData = 'error';
                this.props.onShowPasswordError(errData);
            }
        } else {
            this.props.onShowLoader();
            let userData = {
                username: login.value,
                password: password.value
            };
            if(scenario === 'SignIn') {
                this.submitLoginForm(userData);
            } else {
                this.submitRegistrationForm(userData);
            }
        }
    }

    submitLoginForm(data) {
        let that = this;
        let json = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/login", true); // false for synchronous request
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log(xhr.responseText);
            } else {
                if (xhr.responseText === 'true') {
                    that.props.onHideLoader(xhr.responseText === 'true');
                } else {
                    that.props.onShowUserError('authorization_error');
                    that.props.onHideLoader(false);
                }
            }
        }
    }

    submitRegistrationForm(data) {
        let json = JSON.stringify(data)
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/registration", true); // false for synchronous request
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log(xhr.responseText);
            } else {
                console.log(xhr.responseText);
            }
        }
    }

    logOut() {
        this.props.onShowLoader();
        this.props.onChangeLogin('');
        this.props.onChangePassword('');
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/logout", true); // false for synchronous request
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log(xhr.responseText);
            } else {
                that.props.onHideLoader(xhr.responseText === 'false');
            }
        }
    }

    askAutorization() {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/autorised", true); // false for synchronous request
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log(xhr.responseText);
            } else {
                that.props.onHideLoader(xhr.responseText === 'true');
            }
        }
    }

    render() {
        let componentsArray;
        if (this.props.eventList.spinner.visible) {
            componentsArray = <Spinner />;
        } else if (this.props.eventList.login.visible) {
            componentsArray = <Form
                changeLogin={this.changeLogin.bind(this)}
                changePassword={this.changePassword.bind(this)}
                validateForm={this.validateForm.bind(this)}
            />;
        } else if (this.props.eventList.calendar.visible) {
            componentsArray = <Calendar
                logOut={this.logOut.bind(this)}
            />;
        }
        return (
            <div className="container">
                { componentsArray }
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
            dispatch({type: 'CHANGE_LOGIN', payload: data});
        },
        onChangePassword: (data) => {
            dispatch({type: 'CHANGE_PASSWORD', payload: data});
        },
        onShowLoginError: (data) => {
            dispatch({type: 'LOGIN_ERROR', payload: data});
        },
        onShowPasswordError: (data) => {
            dispatch({type: 'PASSWORD_ERROR', payload: data});
        },
        onShowUserError: (data) => {
            dispatch({type: 'AUTHORIZATION_ERROR', payload: data});
        },
        onHideLoader: (data) => {
            dispatch({type: 'SHOW_SPINNER', payload: false});
            dispatch({type: 'SHOW_LOGIN', payload: !data});
            dispatch({type: 'SHOW_CALENDAR', payload: data});
        },
        onShowLoader: () => {
            dispatch({type: 'SHOW_SPINNER', payload: true});
            dispatch({type: 'SHOW_LOGIN', payload: false});
            dispatch({type: 'SHOW_CALENDAR', payload: false});
        }
    })
)(App);