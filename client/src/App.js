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
        this.props.onShowUserError({className: "authorization_not_error", text: " "});
    }

    changePassword(e) {
        this.props.onChangePassword(e.target.value);
        let errData = "";
        this.props.onShowPasswordError(errData);
        this.props.onShowUserError({className: "authorization_not_error", text: " "});
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
                    that.props.onShowUserError({className: 'authorization_error', text: xhr.responseText});
                    that.props.onHideLoader(false);
                }
            }
        }
    }

    submitRegistrationForm(data) {
        let that = this;
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
                if (xhr.responseText === 'true') {
                    that.props.onHideLoader(xhr.responseText === 'true');
                } else {
                    that.props.onShowUserError({className: 'authorization_error', text: xhr.responseText});
                    that.props.onHideLoader(false);
                }
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
        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", "/autorised", true); // false for synchronous request
        // xhr.setRequestHeader("Content-type", "application/json");
        // xhr.send();
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState !== 4) return;
        //     if (xhr.status !== 200) {
        //         console.log(xhr.responseText);
        //     } else {
        //         that.props.onHideLoader(xhr.responseText === 'true');
        //     }
        // }
        that.props.onHideLoader(true);
    }

    buildTimes() {
        let dayStart = this.props.eventList.calendar.dayStart.getTime(),
            dayEnd = this.props.eventList.calendar.dayEnd.getTime(),
            stepTime = (30 * 60 * 1000),
            timesArray = [];
        for (let i = dayStart; i <= dayEnd; i += stepTime) {
            let dt = this.normalizeDate(new Date(i));
            timesArray.push(dt);
        }
        return (
            timesArray.map((item, key) => {
                return <p
                    key={key}
                >
                    {item}
                </p>
            })
        )
    }

    normalizeDate(date) {
        var min = date.getMinutes();
        var hours24 = date.getHours();
        var hour = (hours24 + 11) % 12 + 1;
        if (min === 0) {
            min = "00";
        }
        var time = hour + ":" + min;
        return time;
    }

    createEvents(events) {
        let collisions = this.getCollisions(events),
            attributes = this.getAttributes(events, collisions);
        return events.map((event, id) => {
            let height = event.duration,
                top = event.start,
                width = attributes.width,
                leftOffSet = attributes.leftOffSet,
                containerWidth = 200;
            let units = width[id];
            if (!units) {
                units = 1
            }
            let left = (containerWidth / width[id]) * (leftOffSet[id] - 1);
            if (!left || left < 0) {
                left = 0
            }
            width = containerWidth / units;
            let  style={
                width: `${width}px`,
                height: `${height}px`,
                marginTop: `${top}px`,
                marginLeft: `${left}px`
            };
            return (
                <div
                    data-event-id={id}
                    key={id}
                    className="event"
                    style={style}
                    onClick={(e) => {
                        console.log(e.target.getAttribute('data-event-id'));
                    }}
                    alt={event.title}
                >
                    <p
                        data-event-id={id}
                    >
                        {event.title}
                    </p>
                </div>
            )
        });
    }

    getCollisions(events) {
        let collisions = [];
        let step = 15;
        let stepsLimit = (this.props.eventList.calendar.dayEnd.getHours() - this.props.eventList.calendar.dayStart.getHours()) * (60 / step);
        for (var i = 0; i < stepsLimit; i++) {
            var time = [];
            for (var j = 0; j < events.length; j++) {
                time.push(0);
            }
            collisions.push(time);
        }
        events.forEach((event, id) => {
            let end = event.start + event.duration;
            let order = 1;
            let start = event.start;
            while (start < end) {
                let timeIndex = Math.floor(start / step);
                while (order < events.length) {
                    if (collisions[timeIndex].indexOf(order) === -1) {
                        break;
                    }
                    order++;
                }
                collisions[timeIndex][id] = order;
                start = start + step;
            }
            collisions[Math.floor((end - 1) / step)][id] = order;
        });
        return collisions;
    }

    getAttributes(events, collisions) {
        let width = [];
        let leftOffSet = [];
        for (var i = 0; i < events.length; i++) {
            width.push(0);
            leftOffSet.push(0);
        }
        collisions.forEach((period) => {
            let count = period.reduce((a, b) => {
                return b ? a + 1 : a;
            });
            if (count > 1) {
                period.forEach((event, id) => {
                    if (period[id]) {
                        if (count > width[id]) {
                            width[id] = count;
                        }
                    }
                    if (period[id] && !leftOffSet[id]) {
                        leftOffSet[id] = period[id];
                    }
                })
            }
        });
        return {
            width: width,
            leftOffSet: leftOffSet
        }
    }

    addEvent(e) {
        const that = this;
        let createrData = {
            top: 0,
            height: 0
        };
        let startData = 0;
        function setParams(event) {
            if (!startData) {
                startData = event.clientY;
            }
            if (event.clientY >= 20 && event.clientY <= 590) {
                createrData.top = startData < event.clientY ? startData : event.clientY;
                createrData.height = startData <= event.clientY ? event.clientY - startData : startData - event.clientY;
            };
            that.props.onUpdateEventCreater(createrData);
        };
        function mouseUp(e) {
            setParams(e);
            let updaterData = {
                top: e.clientY - 75,
                left: e.clientX + 10
            };
            document.body.removeEventListener('mousemove', setParams);
            that.props.onShowEventUpdater(updaterData);
            document.body.removeEventListener('mouseup', mouseUp);
        }
        document.body.addEventListener('mousemove', setParams);
        document.body.addEventListener('mouseup', mouseUp);
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
                buildTimes={this.buildTimes.bind(this)}
                createEvents={this.createEvents.bind(this)}
                addEvent={this.addEvent.bind(this)}
                logOut={this.logOut.bind(this)}
                onShowEventUpdater={this.props.onShowEventUpdater.bind(this)}
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
        },
        onShowEventUpdater: (top) => {
            dispatch({type: 'SHOW_EVENT_UPDATER', payload: top});
        },
        onUpdateEventCreater: (data) => {
            dispatch({type: 'UPDATE_EVENT_CREATER', payload: data});
        }
    })
)(App);