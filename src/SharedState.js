import React, { Component } from 'react';

const listeners = Symbol('listeners'); 
class Store {
  constructor() {
    this.ast = null;
    this.messages = [];
  }

  get listeners() {
    if (this[listeners] == null) {
      this[listeners] = {}
    }
    return this[listeners];
  }

  addMessage(type, message) {
    this.messages.push({type, message});
    this.dispatchEvent('messages', this.messages);
  }

  clearMessages() {
    this.messages = [];
    this.dispatchEvent('messages', this.messages);
  }

  updateAst(ast) {
    this.ast = ast;
    this.dispatchEvent('ast', this.ast);
  }

  addEventListener(event, callback) {
    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  removeEventListener(event, callback) {
    this.listeners[event] = this.listeners[event].filter(x => x != callback);
  }

  dispatchEvent(event, ...args) {
    if (!(event in this.listeners)) {
      return;
    }
    this[listeners][event].forEach(x => x(...args));
  }
}

class SharedState extends Component {
  constructor(props) {
    super(props);

    this.store = new Store();
    window.addEventListener('unload', () => {
      localStorage.setItem(this.props.name, JSON.stringify(this.store.ast));
    });
  }

  componentDidMount() {
    const ast = JSON.parse(localStorage.getItem(this.props.name));
    if (ast !== null) {
      this.store.updateAst(ast);
    }
  }

  render() {
    return (
      <React.Fragment>{this.props.render(this.store)}</React.Fragment>
    );
  }
}

export default SharedState;
