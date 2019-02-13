import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {TabsContext} from './TabsContext'

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
      activeTab: this.props.activeTab,
      tabNames: [],
      setActiveTab: this.setActiveTab
    }
  }

  componentDidMount() {
    this.setState({tabNames: React.Children.map(this.props.children, child => child.props.tabName)})
  }

  setActiveTab = tabName => {
    this.setState({activeTab: tabName});
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <TabsContext.Provider value={this.state}>
          {React.Children.map(this.props.children, child =>
            child.props.tabName === this.state.activeTab && <div className={classes.tab}>{child}</div>
          )}
        </TabsContext.Provider>
      </div>
    );
  }
}

export default injectSheet(style)(Tabs);
