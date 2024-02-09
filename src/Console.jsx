import React, { Component } from 'react';
import injectSheet from 'react-jss';
import refreshable from './refreshable.jsx';
import {evaluate} from './evaluator.js';
import {light as colors} from './lang/colors.js';
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

class Console extends Component { // TODO: A bit inefficient because the component is controlled

  constructor(props) {
    super(props);

    this.ast = [];
    this.state = {
      messages: [],
      output: [],
      variables: [],
      changed: null,
      running: false,
      stepping: false,
      lock: true
    }
    this.step = () => {};
    this.rendered = null;
    this.line = React.createRef();
  }

  astChange = (ast) => {
    this.ast = ast;
  }

  async run() {
    const {classes} = this.props;

    const print = (message) => {
      return new Promise(resolve => {
        this.rendered = () => {
          resolve();
        };

        this.setState(prevState => {
          return {output: [...prevState.output, <span className={classes.input}>{message}</span>]};
        });
      });
    };

    const error = message => {
      this.setState(prevState => {
        return {output: [...prevState.output, <div className={classes.error}>{message}</div>], running: false};
      });
    };

    const delimiter = message => {
      this.setState(prevState => {
        return {output: [...prevState.output, <hr style={{backgroundColor: 'gainsboro', height: '1px', border: 0}} />]};
      });
    };

    const input = async () => {
      return new Promise((resolve, reject) => {
        const onEnter = async event => {
          event.persist();
          if (event.key === 'Enter') {
            const text = event.target.textContent;
            if (text !== '' && isFinite(text)) {
              resolve(Number(text));
            } else {
              error("Neveljaven vnos");
              reject();
            }
            event.target.contentEditable = false;
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
      if (this.state.stepping) {
        return new Promise(resolve => {
          this.step = () => {
            resolve();
          }
        });
      }
      return () => {};
    };

    const running = () => {
      return this.state.running;
    };

    const update = (variables, changed) => {
      this.setState({variables, changed});
    };

    this.setState({output: [], running: true, variables: [], changed: null}, async () => {
      db.storeAst(this.props.task, 'run', this.ast);
      await evaluate(this.ast, print, input, error, wait, update, running, delimiter);
      this.setState({running: false});
    });
  }

  onRun = () => {
    if (!this.state.running) {
      this.setState({stepping: false}, () => {
        this.run();
      });
      return;
    }

    this.setState({stepping: false}, () => {
      this.step();
    });
  }

  onStep = () => {
    if (!this.state.running) {
      this.setState({stepping: true}, () => {
        this.run();
      });
      return;
    }

    this.step();
    this.setState({changed: null});
  }

  onPause = () => {
    this.setState({stepping: true});
  }

  onStop = () => {
    this.setState({running: false}, () => {
      this.step();
    });
  }

  onScroll = event => {
    this.setState({lock: this.line.current.scrollTop === this.line.current.scrollHeight - this.line.current.offsetHeight ||
      this.line.current.scrollLeft === this.line.current.scrollWidth - this.line.current.offsetWidth});
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

  componentDidUpdate() {
    if (this.state.lock) {
      this.line.current.scrollTop = this.line.current.scrollHeight; // TODO: Rename line
      this.line.current.scrollLeft = this.line.current.scrollWidth;
    }
    if (this.rendered != null) {
      setTimeout(() => {
        this.rendered();
      }, 0);
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.toolbar}>
          <button onClick={this.onRun}>Run</button>
          <button onClick={this.onStep}>Step</button>
          <button onClick={this.onPause}>Pause</button>
          <button onClick={this.onStop}>Stop</button>
        </div>
        <div className={classes.split}>
          <pre ref={this.line} className={classes.console} onScroll={this.onScroll}>
            {this.state.output}
          </pre>
          {this.state.stepping &&
            <div className={classes.watch}>
              {Object.entries(this.state.variables).map(([key, value]) =>
                key === this.state.changed ?
                  <div style={{fontWeight: 600}}>{key}: {value}</div> :
                  <div>{key}: {value}</div>
              )}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default refreshable(injectSheet(style)(Console));
