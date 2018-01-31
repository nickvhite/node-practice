import React, {Component} from 'react';
import {connect} from 'react-redux';

class Calendar extends Component {
    render() {
        let calendarData = this.props.eventList.calendar;
        let updaterData = this.props.eventList.eventUpdater;
        let newEventStyle = {
            top: calendarData.createrTop,
            height: calendarData.createrHeight
        };
        let updaterStyle = {
            top: updaterData.updaterTop,
            left: updaterData.updaterLeft
        };
        return (
            <div id="calendar_container">
                <div id="time_list">
                    {this.props.buildTimes()}
                </div>
                <div
                    id="event_list"
                    onMouseDown={this.props.addEvent}
                 >
                    {this.props.createEvents(calendarData.events)}
                </div>
                <p
                    className="new_event"
                    style = {newEventStyle}
                >
                </p>
                {updaterData.visible ? <div
                    className="event_updater_container"
                    onClick={(e) => {
                        this.props.onShowEventUpdater({top: 0, left:0});
                    }}
                >
                    <div
                        className="event_updater"
                        style={updaterStyle}
                    >

                    </div>
                </div> : null}
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