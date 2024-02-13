import React, {Component} from 'react';
import parser, {ParseError} from './lang/parser.js';
import BlocklyView from './BlocklyView.jsx';
import TextView from './TextView.jsx';
import classes from './CodeBlock.module.css'

function CodeBlock({literal}) {
  const ast = parser.parse(literal);
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

export default CodeBlock;
