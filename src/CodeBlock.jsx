import React, {Component} from 'react';
import parser, {ParseError} from './lang/parser.js';
import BlocklyView from './BlocklyView.jsx';
import TextView from './TextView.jsx';
import injectSheet from 'react-jss';

const style = {
  container: {
    display: 'flex',
    flexFlow: 'row',
    padding: '10px 0'
  },
  child: {
    flex: '1 1 0',
    outline: '1px solid gainsboro',
  }
};

class CodeBlock extends Component {
  render() {
    const {classes} = this.props;

    const ast = parser.parse(this.props.literal);
    return (
      <div className={classes.container}>
        <div className={classes.child}>
          <TextView ast={ast} />
        </div>
        <div className={classes.child}>
          <BlocklyView ast={ast} />
        </div>
      </div>
    );
  }
}

export default injectSheet(style)(CodeBlock);
