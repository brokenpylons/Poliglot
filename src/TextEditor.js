import React, { Component } from 'react';
import CodeMirror from './codeMirror';
import injectSheet from 'react-jss';

const style = {
  '@global': {
    '.CodeMirror': {
        position: 'absolute'
    }
  },
  editor: {
    position: 'relative',
    width: '100%',
    height: '100%',
  }
}

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
    const { classes } = this.props;
    return (
        <div className={classes.editor} ref={this.editor} />
    );
  }
}

export default injectSheet(style)(TextEditor);
