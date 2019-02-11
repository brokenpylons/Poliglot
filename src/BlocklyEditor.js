import React, { Component } from 'react';
import Blockly from './blockly';
import {save, load, formatBlocks} from './converter';

class BlocklyEditor extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.workspace = null;

    Blockly.defineBlocksWithJsonArray(this.props.blocks);
  }

  onWheel = (e) => {
    const {scrollbar} = this.workspace;
    scrollbar.set((scrollbar.handlePosition_ / scrollbar.ratio_) + e.deltaY);
  }

  getProgramBlocks() {
    return this.workspace.getTopBlocks(true).filter(x => x.type === 'Program');
  }

  workspaceChange = event => {
    if (event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_CHANGE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_MOVE) {

      const {sharedState} = this.props;
      try {
        sharedState.clearMessages();
        sharedState.removeEventListener('ast', this.astChange);
        sharedState.updateAst(save(this.getProgramBlocks()));
        sharedState.addEventListener('ast', this.astChange);
      } catch(e) {
        // TODO: bettter solution?
      }
    }
  }

  astChange = ast => {
      Blockly.Events.disable();
      this.getProgramBlocks().forEach(x => x.dispose());
      const blocks = load(this.workspace, ast);
      if (blocks != null) {
        formatBlocks(blocks, 22);
      }
      Blockly.Events.enable();
  }

  componentDidMount() {
    this.workspace = Blockly.inject(this.editor.current, {
        toolbox: this.props.toolbox,
        trashcan: true,
        scrollbars: false,
        collapse: true
    });
    this.workspace.scrollbar = new Blockly.Scrollbar(this.workspace, false);

    const xml = this.props.sharedStore.get('BlocklyEditor');
    if (xml != null) {
      const dom = Blockly.Xml.textToDom(xml);
      Blockly.Events.disable();
      Blockly.Xml.domToWorkspace(dom, this.workspace);
      Blockly.Events.enable();
    }
    this.workspace.addChangeListener(this.workspaceChange);
    this.props.sharedState.addEventListener('ast', this.astChange);
  }

  componentWillUnmount() {
    const dom = Blockly.Xml.workspaceToDom(this.workspace);
    const xml = Blockly.Xml.domToText(dom);

    this.props.sharedStore.set('BlocklyEditor', xml);
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}} ref={this.editor} onWheel={this.onWheel} />
    );
  }
}

export default BlocklyEditor;
