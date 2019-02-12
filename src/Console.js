import React, { Component } from 'react';
import injectSheet from 'react-jss';
import refreshable from './refreshable';
import {evaluate} from './evaluator';
import {light as colors} from './lang/colors';
import db from './db';
import {group} from './config';

const style = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white'
  },
  toolbar: {
    backgroundColor: '#f7f7f7',
    paddingLeft: 5,
    outline: '1px solid #ddd',
    '& button': {
      all: 'unset',
      padding: 8,
      '&:hover': {
        backgroundColor: 'gainsboro'
      }
    }
  },
  console: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    fontFamily: 'Source Code Pro, monospace',
    fontSize: '13px',
  },
  error: {
    color: colors.io
  },
  input: {
    border: '1px solid transparent',
    '&:hover': {
      backgroundColor: 'whitesmoke',
      border: '1px solid gray'
    }
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.focus();
  }

  onBlur = () => {
    if (this.input.current.contentEditable) {
      this.input.current.focus();
    }
  }

  render() {
    return (
      <React.Fragment>
        <span {...this.props} ref={this.input} onBlur={this.onBlur} contentEditable='true' style={{display: 'inline-block'}} />
        <br />
      </React.Fragment>
    );
  }
}

class Console extends Component {

  constructor(props) {
    super(props);

    this.ast = [];
    this.state = {
      messages: [],
      output: []
    }
  }

  messagesChange = (messages) => {
    this.setState({messages})
  }

  astChange = (ast) => {
    this.ast = ast;
  }

  onRun = async () => {
    const {classes} = this.props;

    const print = (message) => {
      this.setState(prevState => {
        return {output: prevState.output.concat([
          <span className={classes.input}>{message}</span>
        ])};
      });
    }

    const input = async () => {
      return new Promise((resolve, reject) => {
        const onEnter = async event => {
          event.persist();
          if (event.key === 'Enter') {
            const text = event.target.textContent;
            if (text !== '') {
              resolve(Number(text));
            } else {
              this.props.sharedState.addMessage('error', "TERMINATED");
              reject();
            }
            event.target.contentEditable = false;
            event.preventDefault();
            return;
          }
          if (!isFinite(event.key)) {
            event.preventDefault();
            return;
          }
        }

        this.setState(prevState => {
          return {output: prevState.output.concat([
            <Input className={classes.input} onKeyPress={onEnter} />
          ])};
        });
      });
    }

    this.setState({output: []}, () => {
      db.storeAst(localStorage.getItem('Auth'), group, localStorage.getItem('Username'), this.props.task, 'run', this.ast);
      evaluate(this.ast, print, input);
    });
  }

  componentDidMount() {
    const messages = JSON.parse(this.props.sharedStore.get('ConsoleMessages')) || this.state.messages;
    this.setState({messages});
    this.ast = JSON.parse(this.props.sharedStore.get('ConsoleAst')) || this.ast;

    this.props.sharedState.addEventListener('messages', this.messagesChange);
    this.props.sharedState.addEventListener('ast', this.astChange);
  }

  componentWillUnmount() {
    this.props.sharedStore.set('ConsoleMessages', JSON.stringify(this.state.messages));
    this.props.sharedStore.set('ConsoleAst', JSON.stringify(this.ast));
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.toolbar}>
          <button onClick={this.onRun}>Run</button>
        </div>
        <pre className={classes.console}>
          {this.state.messages.map((x, i) =>
            <div key={i} className={classes[x.type]}>{x.message}</div>
          )}
          {this.state.output}
        </pre>
      </div>
    );
  }
}

export default refreshable(injectSheet(style)(Console));
