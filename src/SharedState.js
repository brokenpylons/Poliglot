import React, { Component } from 'react';
import db from './db';

class State {
  constructor(task) {
    this.task = task;
    this.ast = null;
    this.messages = [];
    this.listeners ={};
  }

  addMessage(message) {
    this.messages.push(message);
    this.dispatchEvent('messages', this.messages);
  }

  clearMessages() {
    this.messages = [];
    this.dispatchEvent('messages', this.messages);
  }

  updateAst(ast, source) {
    if (JSON.stringify(this.ast) === JSON.stringify(ast)) {
      console.log("SAME");
      return;
    }
    console.log(source);
    this.ast = ast;
    this.dispatchEvent('ast', this.ast);
    db.storeAst(localStorage.getItem('Auth'), localStorage.getItem('Username'), this.task, source, ast); // TODO: Should state know about task?
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

    this.state = new State(this.props.task);
    this.store = new Store(this.props.name);
  }

  render() {
    return (
      <React.Fragment>{this.props.render(this.state, this.store)}</React.Fragment>
    );
  }
}

export default SharedState;
