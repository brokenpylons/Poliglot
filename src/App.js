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

          //

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height:'100vh'}}>
        <State render={(state, updateState) => (
          <SplitView> 
            <SplitView direction='column'>
              <BlocklyEditor state={state} updateState={updateState} blocks={blocks} toolbox={toolbox} />
              <TextEditor state={state} updateState={updateState} mode={mode} />
            </SplitView>
            <SplitView direction='column'> 
              <p>
                Naloga 1: Izračunaj 1 + 1
                Bloa <br/ >
                dsad  <br />
                asd
              </p>
              <Console />
            </SplitView>
          </SplitView>
          )} />
      </div>
    );
  }
}

export default App;
