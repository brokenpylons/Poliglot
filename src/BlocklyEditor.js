import React, { Component } from 'react';
import Blockly from './blockly';
import {save, load, formatBlocks} from './converter';

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

    workspace.addChangeListener(event => {
      if (event.type === Blockly.Events.BLOCK_CREATE || 
        event.type === Blockly.Events.BLOCK_CHANGE ||
        event.type === Blockly.Events.BLOCK_DELETE ||
        event.type === Blockly.Events.BLOCK_MOVE) { // && event.newParentId != null)) {
        try {
          this.props.updateState({lastUpdater: 1, ast: save(workspace)});
        } catch {}
      }
    });
    this.setState({workspace: workspace});
  }

  render() {
    if (this.state.workspace != null && this.props.state.lastUpdater !== 1) {
      Blockly.Events.disable();
      this.state.workspace.clear();
      const blocks = load(this.state.workspace, this.props.state.ast);
      if (blocks != null) {
        formatBlocks(blocks, 22);
      }
      Blockly.Events.enable();
    }
    return (
      <div style={{width: '100%', height: '100%'}} ref={this.editor} onWheel={this.onWheel} />
    );
  }
}

export default BlocklyEditor;
