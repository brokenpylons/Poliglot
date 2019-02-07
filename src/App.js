import React, { Component } from 'react';
import TextEditor from './TextEditor.js'
import BlocklyEditor from './BlocklyEditor'
import SplitView from './SplitView';
import Console from './Console';
import State from './State';
import {blocks, toolbox, mode} from './lang/definitions.js'

        /*<div>Ime<input type="" name="" /></div>
        <div>Id<input type="" name="" /></div>
        <button>Login</button>*/

          // <BlocklyEditor state={state} updateState={updateState} blocks={blocks} toolbox={toolbox} />

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height:'100vh'}}>
        <State render={(state, updateState) => (
          <SplitView> 
            <SplitView direction='column'>
              <TextEditor state={state} updateState={updateState} mode={mode} />
            </SplitView>
            <SplitView direction='column'> 
              <p>
                Naloga 1: Izračunaj 1 + 1
                Bloa <br/ >
                dsad  <br />
                asd
              </p>
              <Console state={state} updateState={updateState} />
            </SplitView>
          </SplitView>
          )} />
      </div>
    );
  }
}

export default App;
