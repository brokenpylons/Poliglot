import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import injectSheet from 'react-jss';
import Home from './Home';
import TextEditor from './TextEditor.jsx';
import BlocklyEditor from './BlocklyEditor';
import SplitView from './SplitView';
import Console from './Console';
import SharedState from './SharedState';
import Task from './Task';
import Tabs from './Tabs';
import TabsHeader from './TabsHeader';
import Booklet from './Booklet';
import {mode} from './lang/definitions.js';
import {blocks as limpidBlocks, toolbox as limpidToolbox} from './newlang/limpid/blockly.js';
import {blocks as grammarBlocks, toolbox as grammarToolbox} from './newlang/grammar/blockly.js';
import Blockly from './blockly';
import CodeMirror from './codeMirror';
import db from './db';
import config from './config';
import {withTranslation} from 'react-i18next';

import './i18n';

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
  version: {
    margin: '5px',
    fontSize: '10px',
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

  componentDidMount() {
    document.title = config.name;
  }

  setUsername = username => {
    this.setState({username})
  }

  render() {
    Blockly.defineBlocksWithJsonArray(limpidBlocks); // TODO: Should this really be here? I doesn't work in componentDidMount (not called on refresh)
    Blockly.defineBlocksWithJsonArray(grammarBlocks);
    CodeMirror.defineSimpleMode('custom', mode);

    const {classes} = this.props;
    const {t} = this.props;

    return (
      <Router>
        <div className={classes.container}>
          <div className={classes.header}>
            <nav className={classes.navigation}>
              <span className={classes.title}>{config.name}<span className={classes.version}>{config.version}</span></span>
              <Link className={classes.link} to="/">{t('Home')}</Link>
              <Link className={classes.link} to="/booklet">{t('Booklet')}</Link>
              <Link className={classes.link} to="/user">{t('User')}</Link>
              <Link className={classes.link} to="/playground1">{t('Block')}</Link>
              <Link className={classes.link} to="/playground2">{t('Text')}</Link>
              <Link className={classes.link} to="/grammar">{t('Grammar')}</Link>
              <Link className={classes.link} to="/exam">{t('Exercises')}</Link>
              {this.state.username}
            </nav>
          </div>
          <div style={{flex: '1 1 0', padding: '10px'}}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/user" element={<User setUsername={this.setUsername} />} />
              <Route path="/booklet" element={<Booklet />} />
              <Route path="/playground1" element={<Playground1 />} />
              <Route path="/playground2" element={<Playground2 />} />
              <Route path="/grammar" element={<Grammar />} />
              <Route path="/exam" element={<Exam />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

const tasks = [
  {
    title: 'Naloga 1: Ogrevanje',
    content: <div>
      <p>Zapišite program, ki te pozdravi in izračuna naslednje račune:</p>

      <pre>
        788 + 15<br/>
        98 - 45<br/>
        12 * 13<br/>
        22 / 12<br/>
      </pre>

      <pre>
        Primer 1:<br/>
        Zdravo!<br/>
        803<br/>
        53<br/>
        156<br/>
        1<br/>
      </pre>
    </div>
  },
  {
    title: 'Naloga 2: Predhodnik/naslednik',
    content: <div>
        <p>Zapišite program, ki na vhodu prejme število in izpiše njegovega predhodnika in naslednika.</p>

        <div style={{border: '1px solid gray', display: 'inline-block', padding: 10}}>
          <p>Namig:</p>
          <p>Predhodnik je število, ki je za 1 manjše od izbranega števila.</p>
          <p>Naslednik je število, ki je za 1 večje od izbranega števila.</p>
        </div>

        <pre>
          Primer 1:<br/>
          {'>'} 1<br/>
          0<br/>
          2<br/>
        </pre>

        <pre>
          Primer 2:<br/>
          {'>'} 6<br/>
          5<br/>
          7<br/>
        </pre>
      </div>
  },
  {
    title: 'Naloga 3: Varno deljenje',
    content: <div>
      <p>Zapišite program, ki prejme dve števili in nad njima izvede varno deljene.</p>
      <p>Pri matematiki, je deljenje z 0 nedefinirano, torej nam računalnik v tem primeru zato vrne napako.
      Operacija varnega deljenja namesto napake vrne kar število 0.</p>

      <pre>
        Primer 1:<br/>
        {'>'} 1<br/>
        {'>'} 0<br/>
        0<br/>
      </pre>

      <pre>
        Primer 2:<br/>
        {'>'} 10<br/>
        {'>'} 5<br/>
        2<br/>
      </pre>
    </div>
  },
  {
    title: 'Naloga 4: Zmnožek prvih n števil',
    content: <div>
      <p>Napišite program, ki na vhodu prejme poljubno število n in izračuna zmnožek vseh števil od 1 do n.</p>
      <p>Dobljenemu številu v matematiki rečemo tudi fakulteta in ga zapišemo kot "n!".</p>
      <p>V primeru, da uporabnik vnese število manjše ali enako 0 program ne vrne ničesar.</p>

      <pre>
        Primer 1:<br/>
        {'>'} 0 <br />
      </pre>

      <pre>
        Primer 2:<br/>
        {'>'} 4 <br />
        24 <br />
      </pre>

      <pre>
        Primer 3:<br/>
        {'>'} 8 <br />
        40320 <br />
      </pre>
    </div>
  },
  {
    title: 'Naloga 5: Ugibanje kvadrata števila',
    content: <div>
      <p>Napišite interaktivni program za učenje kvadriranja števil. Program naj omogoča,
      da najprej vnesete poljubno število nato pa vnesete še njegov kvadrat, nato pa program preveri ali ste kvadrat pravilno izračunali.
      Program lahko zaključite tako, da ne vnesete dobenega števila (samo enter)</p>

      <div style={{border: '1px solid gray', display: 'inline-block', padding: 10}}>
        <p>Namig:</p>
        <p>Kvadrat števila lahko izračunate, da število pomnožite samo s sabo (x² = x * x)</p>
      </div>

      <pre>
        Primer 1:<br />
        {'>'} 10 <br />
        {'>'} 100 <br />
        Pravilno! <br />
        {'>'} 5 <br />
        {'>'} 25 <br />
        Pravilno! <br />
        {'>'} 2 <br />
        {'>'} 1 <br />
        Narobe! <br />
        {'>'} Enter <br />
      </pre>
    </div>
  },
  {
    title: 'Naloga 6: Fibonacci',
    content: <div>
      <p>Napišite program, ki bo izpisal zaporedje prvih n členov Fibonaccijevega zaporedja.</p>

      <div style={{border: '1px solid gray', display: 'inline-block', padding: 10}}>
        <p>Namig:</p>
        <p>Za rešitev te naloge boste potrebovali tri spremenljivke.</p>
      </div>

      <p>Zaporedje je podano z naslednjo enačbo:</p>
      <pre>
        f(0) = 0 <br />
        f(1) = 1 <br />
        f(n) = f(n - 1) + f(n - 2) <br />
      </pre>
      <p>Ta enačba nam pove, da n-ti člen v zaporedju izračunamo, kot vsoto prejšnjih dveh. Prva dva člena pa sta 0 in 1.</p>
      <p>Izračun za prvih nekaj členov:</p>
      <pre>
        f(0) = 0 <br />
        f(1) = 1 <br />
        f(2) = 0 + 1 = 1 <br />
        f(3) = 1 + 1 = 2 <br />
        f(4) = 1 + 2 = 3 <br />
        f(5) = 2 + 3 = 5 <br />
        f(6) = 3 + 5 = 8 <br />
        ...
      </pre>

      <pre>
        Primer 1:<br/>
        {'>'} 0 <br />
        0 <br />
      </pre>

      <pre>
        Primer 2:<br/>
        {'>'} 3 <br />
        3 <br />
      </pre>

      <pre>
        Primer 3:<br/>
        {'>'} 6 <br />
        8 <br />
      </pre>
    </div>
  },
]



class User extends Component {

  onSignUp = async event => {
    event.preventDefault();

    const username = event.target.username.value;
    const group = event.target.group.value;
    const password = event.target.password.value;
    await db.signUp(username, group, password);
  }

  onSubmit = async event => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    await db.signIn(username, password);
    this.props.setUsername(username);
  }

  onClick = () => {
    this.props.setUsername(null);
  }

  render() {
    return (
      <div>
        <div>
          <form style={{display: 'table', borderSpacing: 10, outline: '1px solid #ddd'}} onSubmit={this.onSignUp}>
            <div style={{display: 'table-row'}}>
              <label style={{display: 'table-cell'}}>Uporabniško ime:</label>
              <input style={{display: 'table-cell'}} type="text" name="username" />
            </div>
            <div style={{display: 'table-row'}}>
              <label style={{display: 'table-cell'}}>Skupina:</label>
              <input style={{display: 'table-cell'}} type="text" name="group" />
            </div>
            <div style={{display: 'table-row'}}>
              <label style={{display: 'table-cell'}}>Geslo:</label>
              <input style={{display: 'table-cell'}} type="password" name="password" />
            </div>
            <input type='submit' value='Registracija' />
          </form>
        </div>
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
      </div>
    );
  }
}

class Playground1 extends Component {
  render() {
    const {classes} = this.props;
    return (
      <SharedState name='playground1' task='playgroud' render={(sharedState, sharedStore) => (
        <SplitView style={{}}>
          <SplitView style={{flexDirection: 'column'}}>
            <Console sharedState={sharedState} sharedStore={sharedStore} />
          </SplitView>
          <SplitView style={{flexDirection: 'column'}}>
            <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} toolbox={limpidToolbox} />
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
      <SharedState name='playground2' task='playground' render={(sharedState, sharedStore) => (
        <SplitView style={{}}>
          <SplitView style={{flexDirection: 'column'}}>
            <Console sharedState={sharedState} sharedStore={sharedStore} task='playground' />
          </SplitView>
          <SplitView style={{flexDirection: 'column'}}>
            <TextEditor sharedState={sharedState} sharedStore={sharedStore} />
            <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} toolbox={limpidToolbox} />
          </SplitView>
        </SplitView>
      )} />
    );
  }
}

class Grammar extends Component {
  render() {
    const {classes} = this.props;
    return (
      <SharedState name='grammar' task='grammar' render={(sharedState, sharedStore) => (
        <SplitView style={{flexDirection: 'column'}}>
            <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} toolbox={grammarToolbox} />
            <TextEditor sharedState={sharedState} sharedStore={sharedStore} />
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
          <SharedState tabName={i + 1} name={task.title} task={task} render={(sharedState, sharedStore) => (
            <SplitView style={{}}>
              <SplitView style={{flexDirection: 'column'}}>
                <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
                  <TabsHeader />
                  <Task title={task.title} content={task.content} />
                </div>
                <Console sharedState={sharedState} sharedStore={sharedStore} task={task} />
              </SplitView>
              <SplitView style={{flexDirection: 'column'}}>
                <TextEditor sharedState={sharedState} sharedStore={sharedStore} />
                <BlocklyEditor sharedState={sharedState} sharedStore={sharedStore} toolbox={limpidToolbox} />
              </SplitView>
            </SplitView>
            )} />
          )}
      </Tabs>
    );
  }
}

export default  injectSheet(style)(withTranslation()(App));
