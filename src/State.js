import React, { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ast: null,
      mode: 2
    }

    this.handler = {
      set: (obj, prop, value) => {
        this.setState({[prop]: value});
        return true;
      }
    };
  }

  render() {
    this.proxy = new Proxy(this.state, this.handler);
    return (
      <React.Fragment>{this.props.render(this.proxy)}</React.Fragment>
    );
  }
}

export default State;
