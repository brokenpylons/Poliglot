import React, { Component } from 'react';
import injectSheet from 'react-jss';

const style = {
  console: { 
    width: '100%',
    height: '100%'
  }
}

class Console extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.console}>
      Console
      >>>
      </div>
    );
  }
}

export default injectSheet(style)(Console);
