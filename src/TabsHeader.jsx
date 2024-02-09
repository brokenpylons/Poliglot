import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {TabsContext} from './TabsContext.jsx'

const style = {
  toolbar: { // TODO: duplicated in console
    backgroundColor: '#f7f7f7',
    paddingLeft: 5,
    outline: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    '& button': {
      all: 'unset',
      padding: '5px 10px',
      '&:hover': {
        backgroundColor: 'gainsboro'
      }
    }
  },
}

class TabsHeader extends Component {

  render() {
    const {classes} = this.props;
    return (
      <TabsContext.Consumer>
        {({tabNames, setActiveTab}) => (
          <div className={classes.toolbar}>
            {tabNames.map(tabName =>
              <button onClick={() => setActiveTab(tabName)}>{tabName}</button>
            )}
          </div>
        )}
      </TabsContext.Consumer>
    );
  }
}

export default injectSheet(style)(TabsHeader);
