import React, { Component } from 'react';
import injectSheet from 'react-jss';
import {evaluate} from './evaluator';
import {light as colors} from './lang/colors';

const style = {
  console: { 
    position: 'absolute',
    overflow: 'auto',
    margin: 0,
    paddingLeft: '20px',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    fontFamily: 'Source Code Pro, monospace',
    fontSize: '13px',
  },
  error: {
    color: colors.io
  },
  input: {
    width: 0
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

  render() {
    return <span {...this.props} ref={this.input} contentEditable='true' style={{display: 'inline-block'}} />
  }
}

class Console extends Component {

  constructor(props) {
    super(props);

    this.ast = null;
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
        return {output: prevState.output.concat([message])};
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
            <Input onKeyPress={onEnter} />
          ])};
        });
      });
    }

    this.setState({output: []})
    evaluate(this.ast, print, input);
  }

  componentDidMount() {
    const messages = JSON.parse(this.props.sharedStore.get(`${this.constructor.name}messages`)) || []; // TODO: Duplication of initial values
    const output = this.props.sharedStore.get(`${this.constructor.name}output`) || [];
    this.setState({messages, output});

    this.props.sharedState.addEventListener('messages', this.messagesChange);
    this.props.sharedState.addEventListener('ast', this.astChange);
  }

  componentWillUnmount() {
    this.props.sharedStore.set(`${this.constructor.name}messages`, JSON.stringify(this.state.messages));
    this.props.sharedStore.set(`${this.constructor.name}output`, this.state.output);
  }

  render() {
    const {classes} = this.props;
    return (
      <pre className={classes.console}>
        <button onClick={this.onRun}>Run</button><br />
        {this.state.messages.map((x, i) => 
          <div key={i} className={classes[x.type]}>{x.message}</div>
        )}
        {this.state.output}
      </pre>
    );
  }
}

export default injectSheet(style)(Console);
