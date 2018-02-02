import React, {Component} from 'react';
import {connect} from 'react-redux';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

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
        // console.log(updaterData.currentEvent.start._d > updaterData.currentEvent.end._d);
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
                            ></p>
                            <p
                                className="save_button"
                                onClick={(e) => {
                                    this.props.addEvent(updaterData.currentEvent);
                                }}
                            ></p>
                            <p
                                className="delete_button"
                                onClick={(e) => {
                                    this.props.removeEvent(updaterData.currentEvent);
                                }}
                            ></p>
                        </div>
                        <TimePicker
                            className="time_input"
                            showSecond={false}
                            defaultValue={updaterData.currentEvent.start}
                            format='h:mm a'
                            onChange={this.props.updateEventStart}
                            disabledHours={this.props.disabledStartHours}
                            minuteStep={5}
                            use12Hours
                        />
                        <TimePicker
                            className="time_input"
                            showSecond={false}
                            defaultValue={updaterData.currentEvent.end}
                            format='h:mm a'
                            onChange={this.props.updateEventDuration}
                            disabledHours={this.props.disabledEndHours}
                            minuteStep={5}
                            use12Hours
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