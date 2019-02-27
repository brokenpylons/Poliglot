import React, { Component } from 'react';
import injectSheet from 'react-jss';
import refreshable from './refreshable';
import {evaluate} from './evaluator';
import {light as colors} from './lang/colors';
import db from './db';

const style = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  toolbar: {
    backgroundColor: '#f7f7f7',
    paddingLeft: 5,
    outline: '1px solid #ddd',
    '& button': {
      all: 'unset',
      padding: '5px 10px',
      '&:hover': {
        backgroundColor: 'gainsboro'
      }
    }
  },
  split: {
    display: 'flex',
    flex: '1 1 0',
    fontFamily: 'Source Code Pro, monospace',
    fontSize: '0.9rem',
  },
  console: {
    flex: '1 1 0',
    overflow: 'auto',
    margin: 0,
    padding: 5,
    outline: '1px solid gainsboro',
    backgroundColor: 'white'
  },
  watch: {
    width: 200,
    padding: 5,
    outline: '1px solid gainsboro',
    backgroundColor: '#fefefe'
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
      output: [],
      variables: [],
      changed: null,
      running: false
    }
    this.step = null;
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
    };

    const error = message => {
      this.setState(prevState => {
        return {output: prevState.output.concat([
          <div className={classes.error}>{message}</div>
        ])};
      });
    };

    const delimiter = message => {
      this.setState(prevState => {
        return {output: prevState.output.concat([
          <hr style={{backgroundColor: 'gainsboro', height: '1px', border: 0}} />
        ])};
      });
    };

    const input = async () => {
      return new Promise((resolve, reject) => {
        const onEnter = async event => {
          event.persist();
          if (event.key === 'Enter') {
            const text = event.target.textContent;
            if (text !== '') {
              resolve(Number(text));
            } else {
              error("Konec");
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
    };
    
    const wait = () => {
      return new Promise(resolve => {
        this.step = () => {
          resolve();
        }
      });
    };

    const running = () => {
      return this.state.running;
    };

    const update = (variables, changed) => {
      this.setState({variables, changed});
    };

    this.setState({output: [], running: true}, () => {
      db.storeAst(this.props.task, 'run', this.ast);
      evaluate(this.ast, print, input, error, wait, update, running, delimiter);
    });
  }

  onStep = () => {
    this.step();
    this.setState({changed: null});
  }

  onStop = () => {
    this.setState({running: false});
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
          <button onClick={this.onStep}>Step</button>
          <button onClick={this.onStop}>Stop</button>
        </div>
        <div className={classes.split}>
          <pre className={classes.console}>
            {this.state.messages.map((x, i) =>
              <div key={i} className={classes[x.type]}>{x.message}</div>
            )}
            {this.state.output}
          </pre>
          <div className={classes.watch}>
            {Object.entries(this.state.variables).map(([key, value]) => 
              key === this.state.changed ?
                <div style={{fontWeight: 600}}>{key}: {value}</div> :
                <div>{key}: {value}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default refreshable(injectSheet(style)(Console));
