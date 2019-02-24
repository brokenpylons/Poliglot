import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {Link} from "react-router-dom";
import config from './config';

const style = {
  container: {
    maxWidth: '1000px',
    margin: 'auto'
  }
};

class Home extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <h1>{config.name}</h1>
        <p>
          <Link to="/playground1">Bločno</Link>
        </p>
        <p>
          <Link to="/playground2">Tekstovno</Link>
        </p>
        <p>
          <Link to="/exam">Naloge</Link>
        </p>
     </div>
    );
  }
}

export default injectSheet(style)(Home);
