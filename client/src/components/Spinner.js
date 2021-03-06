import React, {Component} from 'react';
import {connect} from 'react-redux';

class Spinner extends Component {
    render() {
        return (
            <div id="preloader">
                <div className="spinWrap">
                    <div className="loader"></div>
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
)(Spinner);