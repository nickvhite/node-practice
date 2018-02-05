import React, {Component} from 'react';
import {connect} from 'react-redux';

class Calendar extends Component {
    render() {
        let calendarData = this.props.eventList.calendar;
        return (
            <div id="calendar_container">
                <p
                    className="log_out"
                    onClick={this.props.logOut}
                >
                    Sign Out
                </p>
                <div id="events_json">
                    <p>
                        {JSON.stringify(this.props.eventList.calendar.events)}
                    </p>
                </div>
                <div id="time_list">
                    {this.props.buildTimes()}
                </div>
                <div
                    id="event_list"
                    onMouseDown={this.props.eventUpdater}
                 >
                    {this.props.createEvents(calendarData.events)}
                </div>
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