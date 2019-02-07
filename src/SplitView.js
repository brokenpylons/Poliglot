import React, { Component } from 'react';
import injectSheet from 'react-jss';

const style = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  child: {
    flex: '1 1 0',
    position: 'relative'
  }
};

class SplitView extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container} style={{flexDirection: this.props.direction}}>
        {React.Children.map(this.props.children, child =>
          <div className={classes.child}>
            {child}
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(style)(SplitView);
