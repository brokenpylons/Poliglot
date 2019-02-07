import React, { Component } from 'react';
import injectSheet from 'react-jss';
import {evaluate} from './evaluator';

const style = {
  console: { 
    width: '100%',
    height: '100%',
    margin: 0
  }
}

class Console extends Component {
  render() {
    let text = "";
    if (this.props.state.ast != null) {
      text = evaluate(this.props.state.ast);
    }

    const {classes} = this.props;
    return (
      <pre className={classes.console}>
        {this.props.state.errors}
        {text}
      </pre>
    );
  }
}

export default injectSheet(style)(Console);
