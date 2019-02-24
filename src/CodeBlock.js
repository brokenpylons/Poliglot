import React, {Component} from 'react';
import parser, {ParseError} from './lang/parser';
import BlocklyView from './BlocklyView';
import TextView from './TextView';
import injectSheet from 'react-jss';

const style = {
  container: {
    display: 'flex',
    flexFlow: 'row',
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
