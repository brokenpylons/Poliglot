import React, { Component } from 'react';
import Blockly from './Blockly'

class BlocklyEditor extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
  }

  componentDidMount() {
    Blockly.defineBlocksWithJsonArray(this.props.blocks);
    const workspace = Blockly.inject(this.editor.current, { 
        toolbox: this.props.toolbox
    });
  }

  render() {
    const editorStyle = {
      flex: '1 1 0'
    };

    return (
      <div ref={this.editor} style={editorStyle}></div>
    );
  }
}

export default BlocklyEditor;
