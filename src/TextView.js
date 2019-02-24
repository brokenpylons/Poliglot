import React, { Component } from 'react';
import CodeMirror from './codeMirror';
import injectSheet from 'react-jss';
import PrettyPrinter from './lang/prettyprinter';

const style = { // TODO: Duplication
  '@global': {
    '.CodeMirror': {
      height: 'auto'
    },
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  }
}

class TextView extends Component {

  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  componentDidMount() {
    const prettyPrinter = new PrettyPrinter();
    const editor = CodeMirror(this.container.current, {
      value: prettyPrinter.print(this.props.ast),
      readOnly: true,
      lineNumbers: true,
      indentUnit: 4,
      indentWithTabs: true,
      mode: 'custom',
      theme: 'custom'
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container} ref={this.container} />
    );
  }
}

export default injectSheet(style)(TextView);
