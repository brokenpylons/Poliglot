import React, { Component } from 'react';
import CodeMirror from './codeMirror';
import injectSheet from 'react-jss';
import parser, {ParseError} from './lang/parser';
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
      editor: null,
      handler: null
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

    const handler = () => {
      try {
        this.props.updateState({lastUpdater: 2, ast: parser.parse(editor.getValue())});
      } catch(e) {
        if (e instanceof ParseError) {
          this.props.updateState({errors: e.message})
        } else {
          throw e;
        }
      }
    };

    editor.on("change", handler);
    this.setState({editor: editor, handler: handler});
  }

  render() {
    const { classes } = this.props;
    
    if (this.props.state.lastUpdater !== 2 && this.state.editor != null &&
        this.props.state.ast != null) {
      this.state.editor.off('change', this.state.handler);
      const pp = new PrettyPrinter();
      try {
        this.state.editor.setValue(pp.print(this.props.state.ast));
      } catch {}
      this.state.editor.on('change', this.state.handler);
    }

    return (
        <div className={classes.editor} ref={this.editor} />
    );
  }
}

export default injectSheet(style)(TextEditor);
