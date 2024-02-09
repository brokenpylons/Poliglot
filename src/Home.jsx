import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {Link} from "react-router-dom";
import config from './config.js';
import {withTranslation} from 'react-i18next';

const style = {
  container: {
    maxWidth: '1000px',
    margin: 'auto'
  }
};

class Home extends Component {
  render() {
    const {classes} = this.props;
    const {t} = this.props;

    return (
      <div className={classes.container}>
        <h1>{config.name}</h1>
        <p>
          <Link to="/playground1">{t('Block')}</Link>
        </p>
        <p>
          <Link to="/playground2">{t('Text')}</Link>
        </p>
        <p>
          <Link to="/exam">{t('Exercises')}</Link>
        </p>
     </div>
    );
  }
}

export default injectSheet(style)(withTranslation()(Home));
