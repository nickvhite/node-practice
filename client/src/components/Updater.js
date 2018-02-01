import React, {Component} from 'react';
import {connect} from 'react-redux';

class Calendar extends Component {
    render() {
        let updaterData = this.props.eventList.eventUpdater;
        let newEventStyle = {
            top: updaterData.createrTop,
            height: updaterData.createrHeight
        };
        let updaterStyle = {
            top: updaterData.updaterTop,
            left: updaterData.updaterLeft
        };
        return (
            <div id="updater_container">
                <p
                    className="new_event"
                    style = {newEventStyle}
                >
                </p>
                {updaterData.updaterVisible ? <div
                    className="event_updater_container"
                    onClick={(e) => {
                        this.props.hideEventUpdater(e);
                    }}
                >
                    <div
                        className="event_updater"
                        style={updaterStyle}
                    >
                        <div className="option_buttons">
                            <p
                                className="close_button"
                                onClick={(e) => {
                                    this.props.hideEventUpdater(e);
                                }}
                            >

                            </p>
                            <p className="save_button"></p>
                            <p className="delete_button"></p>
                        </div>
                        <input
                            className="time_input"
                            type="time"
                            min="01:00"
                            max="12:59"
                            value={updaterData.currentEvent.start}
                            onChange={this.props.updateEventStart}
                        />
                        <input
                            className="time_input"
                            type="time"
                            min="01:00"
                            max="12:59"
                            value={updaterData.currentEvent.end}
                            onChange={this.props.updateEventDuration}
                        />
                        <input
                            className="title_input"
                            type="text"
                            value={updaterData.currentEvent.title}
                            autoFocus
                            onChange={this.props.updateEventTitle}
                        />
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