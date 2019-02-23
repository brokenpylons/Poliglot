import React, { Component } from 'react';
import commonmark from 'commonmark';

class Booklet extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  componentDidMount() {
    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();

    var parsed = reader.parse("Hello *world*");
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
