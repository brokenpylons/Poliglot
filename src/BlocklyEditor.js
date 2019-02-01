import React, { Component } from 'react';
import Blockly from './blockly'

Blockly.WorkspaceDragger.prototype.updateScroll_ = function(x, y) {
  this.workspace_.scrollbar.set(y);
};

class BlocklyEditor extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state = {
      workspace: null
    }
  }

  onWheel = (e) => {
    const {scrollbar} = this.state.workspace;
    scrollbar.set((scrollbar.handlePosition_ / scrollbar.ratio_) + e.deltaY);
  }

  componentDidMount() {
    Blockly.defineBlocksWithJsonArray(this.props.blocks);
    const workspace = Blockly.inject(this.editor.current, { 
        toolbox: this.props.toolbox,
        trashcan: true
    });
    workspace.scrollbar = new Blockly.Scrollbar(workspace, false);
    this.setState({workspace: workspace});
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}} ref={this.editor} onWheel={this.onWheel} />
    );
  }
}

export default BlocklyEditor;
