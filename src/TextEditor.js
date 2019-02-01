import React, { Component } from 'react';
import CodeMirror from './CodeMirror';
import './codeMirrorFlex.css'

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.editor = React.createRef();
  }

  componentDidMount() {
    CodeMirror.defineSimpleMode('custom', this.props.mode);
    const editor = CodeMirror(this.editor.current, {
      lineNumbers: true,
      indentUnit: 4,
      indentWithTabs: true,
      mode: 'custom',
      theme: 'custom',
    });
    editor.setSize("100%", "100%");
  }

  render() {
    return (
      <div style={{display: 'flex', flex: '1 1 0'}}>
        <div ref={this.editor} style={{position: 'relative', flex: '1 1 0'}} />
      </div>
    );
  }
}

export default TextEditor;
