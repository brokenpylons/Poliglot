import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import injectSheet from 'react-jss';
import TextEditor from './TextEditor.js'
import BlocklyEditor from './BlocklyEditor'
import SplitView from './SplitView';
import Console from './Console';
import SharedState from './SharedState';
import Task from './Task';
import Tabs from './Tabs';
import TabsHeader from './TabsHeader';
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
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #ddd'
  },
  navigation: {
    padding: '10px'
  },
  title: {
    margin: '10px'
  },
  link: {
    margin: '10px'
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    }
  }

  setUsername = username => {
    this.setState({username})
  }

  render() {
    const {classes} = this.props;
    return (
      <Router>
        <div className={classes.container}>
          <div className={classes.header}>
            <nav className={classes.navigation}>
              <span className={classes.title}>EditorGenerator</span>
              <Link className={classes.link} to="/">Domov</Link>
              <Link className={classes.link} to="/user">Uporabnik</Link>
              <Link className={classes.link} to="/playground1">Bločno</Link>
              <Link className={classes.link} to="/playground2">Tekstovno</Link>
              <Link className={classes.link} to="/exam">Naloge</Link>
              {this.state.username}
            </nav>
          </div>
          <div style={{flex: '1 1 0', padding: '10px'}}>
            <Route exact path="/" component={Home} />
            <Route path="/user" component={() => <User setUsername={this.setUsername} />} />
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
    title: 'Naloga 1: Predhodnik/naslednik',
    content: <div>
        <div>Zapišite program, ki na vhodu prejme število in izpiše njegovega predhodnika in naslednika.</div>

        <div>Namig:</div>
        <div>Predhodnik je število, ki je za 1 <emp>manjše</emp> od izbranega števila.</div>
        <div>Naslednik je število, ki je za 1 <emp>večje</emp> od izbranega števila.</div>

        <pre>
          Primer 1:<br/>
          Vhod:<br/>
          1<br/>
          Izhod:<br/>
          0<br/>
          2<br/>
        </pre>

        <pre>
          Primer 2:<br/>
          Vhod:<br/>
          6<br/>
          Izhod:<br/>
          5<br/>
          7<br/>
        </pre>
      </div>
  },
  {
    title: 'Naloga 2: Varno deljenje',
    content: <div>
      <div>Zapišite program, ki prejme dve števili in nad njima izvede varno deljene.</div>
      <div>Pri matematiki, je deljenje z 0 nedefinirano, torej nam računalnik v tem primeru zato vrne napako.
      Operacija varnega deljenja namesto napake vrne kar število 0.</div>

      <pre>
        Primer 1:<br/>
        Vhod:<br/>
        1<br/>
        0<br/>
        Izhod:<br/>
        0<br/>
      </pre>

      <pre>
        Primer 2:<br/>
        Vhod:<br/>
        10<br/>
        5<br/>
        Izhod:<br/>
        2<br/>
      </pre>
    </div>
  },
  {
    title: 'Naloga 3: Vsota prvih n števil',
    content: <div>
      <div>Napišite program, ki na vhodu prejme število... Samo gre tut brez for zračunat...</div>
    </div>
  },
  {
    title: 'Naloga 4: Ugibanje kvadrata števila',
    content: <div>
      <div>Napišite interaktivni program za učenje kvadriranja števil. Program naj omogoča,
      da najprej vnesete poljubno število nato pa vnesete še njegov kvadrat, nato pa program preveri ali ste kvadrat pravilno izračunali.
      Program lahko zaključite tako, da ne vnesete dobenega števila (samo enter)</div>
      <div>Namig:</div>
      <div>Kvadrat števila lahko izračunate, da število pomnožite samo s sabo (npr. x * x)</div>
    </div>
  },
  {
    title: 'Naloga 5: Fibonaci',
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
      this.props.setUsername(username.value);
    }
  }

  onClick = () => {
    localStorage.removeItem('Username');
    localStorage.removeItem('Auth');
    this.props.setUsername(null);
  }

  render() {
    return (
      <div>
        <form style={{display: 'table', borderSpacing: 10, outline: '1px solid #ddd'}} onSubmit={this.onSubmit}>
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
            <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} blocks={blocks} toolbox={toolbox} />
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
      <Tabs activeTab={1}>
        {tasks.map((task, i) =>
          <SharedState tabName={i + 1} name={task.title} render={(sharedState, sharedStore) => (
            <SplitView style={{}}>
              <SplitView style={{flexDirection: 'column'}}>
                <div>
                  <TabsHeader />
                  <Task title={task.title} content={task.content} />
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
