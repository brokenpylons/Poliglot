import React, { Component } from 'react';
import injectSheet from 'react-jss';
import commonmark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer';
import CodeBlock from './CodeBlock.jsx';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    margin: 'auto',

    '& p': {
      lineHeight: '1.5em',
    },
    '& code': {
      backgroundColor: 'whitesmoke',
      border: '1px solid gainsboro'
    }
  }
};

class Booklet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null
    }
  }

  async componentDidMount() {
    const reader = new commonmark.Parser();
    const writer = new ReactRenderer({
      renderers: {
        'code_block': CodeBlock
      }
    });

    const response = await fetch('https://raw.githubusercontent.com/brokenpylons/Booklet/master/index.md');
    const data = await response.text();

    const parsed = reader.parse(data);
    const page = writer.render(parsed);
    this.setState({page});
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        {this.state.page}
      </div>
    );
  }
}

export default injectSheet(style)(Booklet);
