import React, { Component } from 'react';
import CodeMirror from './codeMirror';
import injectSheet from 'react-jss';
import refreshable from './refreshable';
import parser, {ParseError} from './lang/parser';
import PrettyPrinter from './lang/prettyprinter';
import {light as colors} from './lang/colors';

const style = {
  '@global': {
    '.CodeMirror': {
      position: 'absolute',
    },
    '.errors': {
      height: '1e6px', // HACK: height: 100% doesn't work in chrome
      borderLeft: '1px solid #ddd',
      backgroundColor: '#f2f2f2',
      width: 15
    }
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  error: {
    borderBottom: '2px solid red'
  },

  errorLine: {
    color: 'red'
  },
}

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.editor = null;
    this.prettyPrinter = new PrettyPrinter();
    this.markers = [];
  }

  editorChange = () => {
    const {sharedState} = this.props;
    try {
      this.editor.clearGutter('errors');
      this.markers.forEach(x => x.clear());
      this.markers = [];
      
      sharedState.clearMessages();
      sharedState.removeEventListener('ast', this.astChange);
      const ast = parser.parse(this.editor.getValue());
      sharedState.updateAst(ast, 'text');
      sharedState.addEventListener('ast', this.astChange);
    } catch(e) {
      if (e instanceof ParseError) {

        let symbol, message;
        if (e.loc != null) {
          const marker = this.editor.markText(
            {line: e.loc.first_line - 1, ch: e.loc.first_column},
            {line: e.loc.last_line - 1, ch: e.loc.last_column },
            {className: this.props.classes.error});
          this.markers.push(marker);
          this.errorLine = e.loc.first_line - 1;
          symbol = '\u2738';

          const clean = (str) => '"' + str.replace(/[_']/g, '') + '"';
          message = `dobil sem ${clean(e.token)}, pričakoval sem ${e.expected.map(clean).join(', ')}`;
        } else {
          this.errorLine = e.line;
          symbol = '\u25B4';
          message = 'neznani simbol'
        }

        const makeMarker = () => {
          var marker = document.createElement("div");
          marker.style.color = 'red';
          marker.style.fontSize = '20px';
          marker.style.lineHeight = '13px';
          marker.style.margin = '0 auto';
          marker.style.textAlign = 'center';
          marker.innerHTML = symbol;
          marker.title = message;
          return marker;
        }
        this.editor.setGutterMarker(this.errorLine, "errors", makeMarker());
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
      gutters: ['CodeMirror-linenumbers', 'errors']
    });
    this.editor.setSize('100%', '100%');
    this.editor.refresh();
    const value = this.props.sharedStore.get('TextEditor');
    if (value != null) {
      this.editor.setValue(value);
    }
    this.editor.on("change", this.editorChange);
    this.props.sharedState.addEventListener('ast', this.astChange);
  }

  componentWillUnmount() {
    this.props.sharedStore.set('TextEditor', this.editor.getValue());
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.container} ref={this.container} />
    );
  }
}

export default refreshable(injectSheet(style)(TextEditor));
