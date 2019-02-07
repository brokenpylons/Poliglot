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
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  }
}

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.editor = null;
    this.prettyPrinter = new PrettyPrinter();
  }

  editorChange = () => {
    const {sharedState} = this.props;
    try {
      sharedState.clearMessages();
      sharedState.removeEventListener('ast', this.astChange);
      sharedState.updateAst(parser.parse(this.editor.getValue()));
      sharedState.addEventListener('ast', this.astChange);
    } catch(e) {
      if (e instanceof ParseError) {
        sharedState.addMessage('error', e.message);
      } else {
        throw e;
      }
    }
  }

  astChange = (ast) => {
    this.editor.off('change', this.editorChange);
    this.editor.setValue(this.prettyPrinter.print(ast));
    this.editor.on('change', this.editorChange);
  }

  componentDidMount() {
    CodeMirror.defineSimpleMode('custom', this.props.mode);
    this.editor = CodeMirror(this.container.current, {
      lineNumbers: true,
      indentUnit: 4,
      indentWithTabs: true,
      mode: 'custom',
      theme: 'custom',
    });
    this.editor.setSize('100%', '100%');
    this.editor.on("change", this.editorChange);
    this.props.sharedState.addEventListener('ast', this.astChange);
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.container} ref={this.container} />
    );
  }
}

export default injectSheet(style)(TextEditor);
