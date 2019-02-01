import React, { Component } from 'react';
import './App.css';
import BlocklyEditor from './BlocklyEditor.js'
import TextEditor from './TextEditor.js'
import {blocks, toolbox, mode} from './lang/definitions.js'

        /*<div>Ime<input type="" name="" /></div>
        <div>Id<input type="" name="" /></div>
        <button>Login</button>*/

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height:'100vh'}}>
        <p>
        Naloga 1: Izračunaj 1 + 1
        Bloa <br/ >
      dsad  <br />
       asd
        </p>
        <div style={{display: 'flex', flex: '1 1 0'}}>
          <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 0'}}>
            <BlocklyEditor blocks={blocks} toolbox={toolbox} />
            <TextEditor mode={mode} />
          </div>
          <div style={{ flex: '1 1 0' }}>
            Console
            >>>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
