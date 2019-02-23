import React, { Component } from 'react';
import commonmark from 'commonmark';

class Booklet extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  async componentDidMount() {
    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();

    const response = await fetch('https://booklet.poliglot.brokenpylons.com/index.md');
    const data = await response.text();

    var parsed = reader.parse(data);
    var result = writer.render(parsed);

    this.container.current.innerHTML = result;
  }

  render() {
    return (
      <div ref={this.container} />
    );
  }
}

export default Booklet;
