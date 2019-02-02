import React, { Component } from 'react';
import CodeMirror from './codeMirror';
import injectSheet from 'react-jss';
import parser from './lang/parser';
import PrettyPrinter from './lang/prettyprinter';

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
    this.state = {
      editor: null
    }
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

    editor.on("change", () => {
      if (this.props.state.mode === 1) {
        try {
          this.props.state.ast = parser.parse(editor.getValue());
        } catch {}
      }
    });
    this.setState({editor: editor});
  }

  render() {
    const { classes } = this.props;
    
    if (this.props.state.mode === 2) {
      if (this.state.editor != null && this.props.state.ast != null) {
        const pp = new PrettyPrinter();
        try {
          this.state.editor.setValue(pp.print(this.props.state.ast));
        } catch {}
      }
    }

    return (
        <div className={classes.editor} ref={this.editor} />
    );
  }
}

export default injectSheet(style)(TextEditor);
