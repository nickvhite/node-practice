import React, {Component} from 'react';
import {connect} from 'react-redux';

class Calendar extends Component {
    render() {
        let calendarData = this.props.eventList.calendar;
        return (
            <div id="calendar">
                <p
                    className="log_out_button"
                    onClick={this.props.logOut}
                >
                    Sign Out
                </p>
                <h1>CALENDAR</h1>
            </div>
        );
    }
}

export default connect(
    state => ({
        eventList: state
    }),
    dispatch => ({})
)(Calendar);