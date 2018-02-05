import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

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
                        <InputRange
                            maxValue={570}
                            minValue={0}
                            formatLabel={value => this.props.getStringTime(value)}
                            value={{min: updaterData.currentEvent.start, max: updaterData.currentEvent.end}}
                            onChange={this.props.updateEventTimes}
                            step={5}
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