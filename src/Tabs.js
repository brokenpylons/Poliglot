import React, { Component } from 'react';
import injectSheet from 'react-jss';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  tab: {
    flex: '1 1 0'
  }
}

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.activeTab
    }
  }

  setActiveTab(tabName) {
    console.log(tabName);
    this.setState({activeTab: tabName});
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <div>
          {React.Children.map(this.props.children, child =>
            <button onClick={() => this.setActiveTab(child.props.tabName)}>{child.props.tabName}</button>
          )}
        </div>
        {React.Children.map(this.props.children, child =>
          child.props.tabName === this.state.activeTab && <div className={classes.tab}>{child}</div>
        )}
      </div>
    );
  }
}

export default injectSheet(style)(Tabs);
