import React, {Component} from 'react';
import injectSheet from 'react-jss';

const style = {
  container: {
    backgroundColor: 'white',
    padding: 5
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  }
}

class Task extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.title}>{this.props.title}</div>
        {this.props.content}
      </div>
    );
  }
}

export default injectSheet(style)(Task);
