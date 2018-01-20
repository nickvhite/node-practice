import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './components/Form';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.askAutorization();
  }

  askAutorization() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/autorised", true); // false for synchronous request
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.log(xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }
  }
  
  render() {
    return (
      <div className="container">
        <Form key="form"/>
      </div>
    )
  }
}

export default connect(
  state => ({
    eventList: state
  }),
  dispatch => ({
    onCreateGreeting: (flag) => {
      dispatch({type: 'CREATE_GREETING', payload: flag});
    }
  })
)(App);