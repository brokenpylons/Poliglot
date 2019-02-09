import React, { Component } from 'react';
import injectSheet from 'react-jss';
import {evaluate} from './evaluator';
import {light as colors} from './lang/colors';

const style = {
  console: { 
    position: 'absolute',
    overflow: 'scroll',
    margin: 0,
    width: '100%',
    height: '100%',
    fontFamily: 'Source Code Pro, monospace',
    fontSize: '13px'
  },
  error: {
    color: colors.io
  }
}

class Console extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      output: ''
    }
  }

  messagesChange = (messages) => {
    this.setState({output: '', messages})
  }

  astChange = (ast) => {
    this.setState({output: evaluate(ast)});
  }

  componentDidMount() {
    const messages = JSON.parse(this.props.sharedStore.get(`${this.constructor.name}messages`)) || [];
    const output = this.props.sharedStore.get(`${this.constructor.name}output`) || '';
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
        {this.state.messages.map((x, i) => 
          <div key={i} className={classes[x.type]}>{x.message}</div>)
        }
        {this.state.output}
      </pre>
    );
  }
}

export default injectSheet(style)(Console);
