import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Blockly from './blockly';
import {load, formatBlocks} from './converter';

const style = {
  '@global': {
    '.blocklyMainBackground': { // TODO: Duplicated
      strokeWidth: 0
    }
  }
}

class BlocklyView extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
  }

  componentDidMount() {
    const workspace = Blockly.inject(this.editor.current, {
      readOnly: true
    });
    const blocks = load(workspace, this.props.ast); // TODO: Optimize this somehow, XML load disables a bunch of stuff when loading from XML
    let height = formatBlocks(blocks, 22);

    this.editor.current.style.height = height + 'px';
    Blockly.svgResize(workspace);
  }

  render() {
    return <div style={{width: '100%'}} ref={this.editor} />;
  }
}

export default injectSheet(style)(BlocklyView);
