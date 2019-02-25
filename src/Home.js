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
				<p>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLScKO91EzqhjM4gnqZAOJu2fNXPSur8cYcmE93x0F-ogSC7y4g/viewform?usp=sf_link">
						Splošne informacije
					</a>
				</p>
				<p>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLSctDD_9xe2Ve3g3E9qsEZCgeGnukEit08OmKPyEOXuCa74SqA/viewform?usp=sf_link">
						Anketa PRED
					</a>
				</p>
				<p>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLSdgpZzv_JAXzaz-Ox88Kf6hfS4QkH8GXL551jDPJjSqOmAdYw/viewform?usp=sf_link">
						Anketa PO	
					</a>
				</p>
     </div>
    );
  }
}

export default injectSheet(style)(Home);
