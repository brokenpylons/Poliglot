import React, { Component } from 'react';
import TextEditor from './TextEditor.js'
import BlocklyEditor from './BlocklyEditor'
import SplitView from './SplitView';
import Console from './Console';
import SharedState from './SharedState';
import {blocks, toolbox, mode} from './lang/definitions.js'

/*
 *
    return (
      <div>
        <div>Ime<input type="" name="" /></div>
        <div>Id<input type="" name="" /></div>
        <button>Login</button>
      </div>
    );
    */

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height:'100vh'}}>
        <SharedState name='test' render={(sharedState) => (
          <SplitView direction='column'>
            <p>
            This is da header bla blo [Booklet][Training][Test]
            </p>
            <SplitView direction='row'> 
              <p>
                Naloga 1: Izračunaj 1 + 1
                Bloa <br/ >
                dsad  <br />
                asd
              </p>
              <Console sharedState={sharedState} />
            </SplitView>
            <SplitView> 
              <BlocklyEditor sharedState={sharedState} blocks={blocks} toolbox={toolbox} />
              <TextEditor sharedState={sharedState} mode={mode} />
            </SplitView>
          </SplitView>
          )} />
      </div>
    );
  }
}

export default App;
