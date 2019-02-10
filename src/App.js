import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import injectSheet from 'react-jss';
import TextEditor from './TextEditor.js'
import BlocklyEditor from './BlocklyEditor'
import SplitView from './SplitView';
import Console from './Console';
import SharedState from './SharedState';
import Tabs from './Tabs';
import {blocks, toolbox, mode} from './lang/definitions.js'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh'
  },
  header: {
    backgroundColor: 'gray'
  },
  navigation: {
    margin: '10px'
  },
  link: {
    margin: '10px'
  }
}

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Router>
        <div className={classes.container}>
          <div className={classes.header}>
          This is da header bla blo
            <nav className={classes.navigation}>
              <Link className={classes.link} to="/">Home</Link>
              <Link className={classes.link} to="/playground">Playground</Link>
              <Link className={classes.link} to="/exam">Exam</Link>
            </nav>
          </div>
          <div style={{flex: '1 1 0'}}>
            <Route exact path="/" component={Home} />
            <Route path="/playground" component={Playground} />
            <Route path="/exam" component={Exam} />
          </div>
        </div>
      </Router>
    );
  }
}

const tasks = [
  {
    title: 'Predhodnik/naslednjik',
    content: 'Program, ki pove predhodnika in naslednika števila.'
  },
  {
    title: 'Varno deljenje',
    content: 'Varno deljenje, če delimo z nič je odgovor 0.'
  },
  {
    title: 'Fibonaci',
    content: 'Izpiši vsa fibonačijeva števila.'
  },
  {
    title: 'GCD',
    content: 'Program, ki vrne GCD. Z besednim opisom, in parmimi primeri.'
  },
  {
    title: 'Abundant number',
    content: 'Preveri ali je število abundant number. Vsota deliteljev večja od števila samega.'
  },
]

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>
          Na playground to train >>
          <Link to="/playground">Playground</Link>
        </p>
        <p>
          Na exam to test >>
          <Link to="/exam">Exam</Link>
        </p>
     </div>
    );
  }
}

class Playground extends Component {
  render() {
    const {classes} = this.props;
    return (
      <SharedState name='playground' render={(sharedState, sharedStore) => (
        <SplitView style={{}}> 
          <SplitView style={{flexDirection: 'column'}}>
            <Console sharedState={sharedState} sharedStore={sharedStore} />
          </SplitView>
          <SplitView style={{flexDirection: 'column'}}>
            <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} blocks={blocks} toolbox={toolbox} />
            <TextEditor sharedState={sharedState} sharedStore={sharedStore} mode={mode} />
          </SplitView>
        </SplitView>
      )} />
    );
  }
}

class Exam extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Tabs activeTab='login'>
        <div tabName='login'>
          <div>Ime<input type="" name="" /></div>
          <div>Id<input type="" name="" /></div>
          <button>Login</button>
        </div>
        {tasks.map((task, i) => 
          <SharedState tabName={i + 1} name={task.title} render={(sharedState, sharedStore) => (
            <SplitView style={{}}> 
              <SplitView style={{flexDirection: 'column'}}>
                <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                  <div>
                  <h1>Naloga {i + 1}: {task.title}</h1>
                  {task.content}
                  </div>
                </div>
                <Console sharedState={sharedState} sharedStore={sharedStore} />
              </SplitView>
              <SplitView style={{flexDirection: 'column'}}> 
                <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} blocks={blocks} toolbox={toolbox} />
                <TextEditor sharedState={sharedState} sharedStore={sharedStore} mode={mode} />
              </SplitView>
            </SplitView>
            )} />
          )}
        <div tabName='anketa'>
          Bla bla bla
        </div>
      </Tabs>
    );
  }
}

export default injectSheet(style)(App);
