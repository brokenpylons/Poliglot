import React, { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ast: null,
      lastUpdater: null,
      mode: 1
    }
  }

  updateState = obj => {
    this.setState(obj);
  }

  render() {
    return (
      <React.Fragment>{this.props.render(this.state, this.updateState)}</React.Fragment>
    );
  }
}

export default State;
