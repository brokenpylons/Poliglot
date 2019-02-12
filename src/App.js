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
import db from './db';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh'
  },
  header: {
    backgroundColor: 'gainsboro'
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
            <nav className={classes.navigation}>
              <Link className={classes.link} to="/">Domov</Link>
              <Link className={classes.link} to="/user">Uporabnik</Link>
              <Link className={classes.link} to="/playground1">Bločno</Link>
              <Link className={classes.link} to="/playground2">Tekstovno</Link>
              <Link className={classes.link} to="/exam">Naloge</Link>
              {localStorage.getItem('Username')}
            </nav>
          </div>
          <div style={{flex: '1 1 0', padding: '10px'}}>
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/playground1" component={Playground1} />
            <Route path="/playground2" component={Playground2} />
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
    title: 'Vsota prvih n števil',
    content: 'Seštej prvih n števil.',
  },
  {
    title: 'Ugibanje kvadrata števila',
    content: 'Ugbaj kvadrat števil.'
  },
  {
    title: 'Fibonaci',
    content: 'Izpiši prvih n fibonačijevih števi.'
  },
]

class Home extends Component {
  render() {
    return (
      <div>
        <h1>EditorGenerator</h1>
        <p>
          <Link to="/playground1">Bločno</Link>
          <Link to="/playground2">Tekstovno</Link>
        </p>
        <p>
          <Link to="/exam">Naloge</Link>
        </p>
     </div>
    );
  }
}

class User extends Component {

  onSubmit = async event => {
    event.preventDefault();

    const {username, password} = event.target;
    const auth = window.btoa(`${username.value}:${password.value}`);
    if (await db.tryAccess(auth)) {
      localStorage.setItem('Username', username.value);
      localStorage.setItem('Auth', auth);
    }
  }

  onClick = () => {
    localStorage.removeItem('Username');
    localStorage.removeItem('Auth');
  }

  render() {
    return (
      <div>
        <form style={{display: 'table', borderSpacing: 10}} onSubmit={this.onSubmit}> 
          <div style={{display: 'table-row'}}>
            <label style={{display: 'table-cell'}}>Uporabniško ime:</label>
            <input style={{display: 'table-cell'}} type="text" name="username" />
          </div>
          <div style={{display: 'table-row'}}>
            <label style={{display: 'table-cell'}}>Geslo:</label>
            <input style={{display: 'table-cell'}} type="password" name="password" />
          </div>
          <input type='submit' value='Prijava' />
          <button onClick={this.onClick}>Odjava</button>
        </form>
      </div>
    );
  }
}

class Playground1 extends Component {
  render() {
    const {classes} = this.props;
    return (
      <SharedState name='playground1' render={(sharedState, sharedStore) => (
        <SplitView style={{}}> 
          <SplitView style={{flexDirection: 'column'}}>
            <Console sharedState={sharedState} sharedStore={sharedStore} />
          </SplitView>
          <SplitView style={{flexDirection: 'column'}}>
            <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} blocks={blocks} toolbox={toolbox} />
            <TextEditor sharedState={sharedState} sharedStore={sharedStore} mode={mode} task='playground' />
          </SplitView>
        </SplitView>
      )} />
    );
  }
}

class Playground2 extends Component {
  render() {
    const {classes} = this.props;
    return (
      <SharedState name='playground2' render={(sharedState, sharedStore) => (
        <SplitView style={{}}> 
          <SplitView style={{flexDirection: 'column'}}>
            <Console sharedState={sharedState} sharedStore={sharedStore} task='playground' />
          </SplitView>
          <SplitView style={{flexDirection: 'column'}}>
            <TextEditor sharedState={sharedState} sharedStore={sharedStore} mode={mode} task='playground' />
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
      <Tabs>
        {tasks.map((task, i) => 
          <SharedState tabName={i + 1} name={task.title} render={(sharedState, sharedStore) => (
            <SplitView style={{}}> 
              <SplitView style={{flexDirection: 'column'}}>
                <div style={{backgroundColor: 'white'}}>
                  <h1>Naloga {i + 1}: {task.title}</h1>
                  {task.content}
                </div>
                <Console sharedState={sharedState} sharedStore={sharedStore} task='task' />
              </SplitView>
              <SplitView style={{flexDirection: 'column'}}> 
                <TextEditor sharedState={sharedState} sharedStore={sharedStore} mode={mode} task={task} />
              </SplitView>
            </SplitView>
            )} />
          )}
      </Tabs>
    );
  }
}

export default injectSheet(style)(App);
