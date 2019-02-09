import React, { Component } from 'react';

class State {
  constructor(key) {
    this.key = key;
    this.ast = null;
    this.messages = [];
    this.listeners ={};
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
    this.listeners[event].forEach(x => x(...args));
  }
}

class Store {
  constructor(storeKey) {
    this.storeKey = storeKey;
  }

  getCombinedKey(key) {
    return `[${this.storeKey}$${key}]`
  }

  set(key, value) {
    localStorage.setItem(this.getCombinedKey(key), value);
  }

  get(key) {
    return localStorage.getItem(this.getCombinedKey(key));
  }
}

class SharedState extends Component {
  constructor(props) {
    super(props);

    this.state = new State();
    this.store = new Store(this.props.name);
  }

  /*componentDidMount() {
    const ast = JSON.parse(localStorage.getItem(this.constructor.name));
    if (ast !== null) {
      this.store.updateAst(ast);
    }
  }

  componentWillUnmount() {
      this.store.set(this.constructor.name, JSON.stringify(this.store.ast));
  }*/

  render() {
    return (
      <React.Fragment>{this.props.render(this.state, this.store)}</React.Fragment>
    );
  }
}

export default SharedState;
