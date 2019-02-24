import React, { Component } from 'react';
import commonmark from 'commonmark';

class Booklet extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  async componentDidMount() {
    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();

    const response = await fetch('https://booklet.poliglot.brokenpylons.com/index.md');
    const data = await response.text();

    const parsed = reader.parse(data);
    const walker = parsed.walker();

    let event;
    while (event = walker.next()) {
      const node = event.node;

      console.log(node);
      if (node.type === 'code_block') {
        node._type = 'html_block';
        node.literal = '<b>Hello</b>';
      }
    }

    const result = writer.render(parsed);
    this.container.current.innerHTML = result;
  }

  render() {
    return (
      <div ref={this.container} />
    );
  }
}

export default Booklet;
