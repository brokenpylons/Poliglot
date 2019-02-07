import {isValue, isCommand, isList} from './ast';

function descent(ctx, ast, previous) {
  const [c, ...args] = ast;
  console.log(c);
  return table[c](ctx, args, previous);
}

function iterate(ctx, a) {
  let previous;
  for (let x of a) {
    previous = descent(ctx, x, previous);
  }
}

function binaryOperator(fun) {
  return (ctx, args) => {
    const [a, b] = args;
    return fun(descent(ctx, a), descent(ctx, b));
  }
}

function unaryOperator(fun) {
  return (ctx, args) => {
    const [a] = args;
    return fun(descent(ctx, a));
  }
}

const next = Symbol('next');

const table = {
  Program: function(ctx, args) {
    const [stmts] = args;
    ctx.variables = {};
    iterate(ctx, stmts);
  },

  If: function(ctx, args) {
    const [expr, stmts] = args;
    if (descent(ctx, expr)) {
      iterate(ctx, stmts);
      return {[next]: false};
    } 
    return {[next]: true};
  },

  Elseif: function(ctx, args, previous) {
    if (previous == null || previous[next] == null) {
      throw new Error("Semantic error")
    }

    const [expr, stmts] = args;
    if (!previous[next]) {
      return {[next]: false};
    }

    if (descent(ctx, expr)) {
      iterate(ctx, stmts);
      return {[next]: false};
    }
    return {[next]: true};
  },

  Else: function(ctx, args, previous) {
    if (previous == null || previous[next] == null) {
      throw new Error("Semantic error")
    }

    if (!previous[next]) {
      return;
    }

    const [stmts] = args;
    iterate(ctx, stmts);
  },

  While: function(ctx, args) {
    const [expr, stmts] = args;
    for (let i = 0; i < 100 && descent(ctx, expr); i++) {
      iterate(ctx, stmts);
    }
  },

  And: binaryOperator((a, b) => a && b),
  Or: binaryOperator((a, b) => a || b),
  Not: unaryOperator((a) => !a), 

  String: function(ctx, args) {
      const [string] = args;
      return string;
  },

  Print: function(ctx, args) {
    const [expr] = args;
    ctx.buffer.push(descent(ctx, expr));
  },

  Line: function(ctx) {
      return '\n';
  },

  // TODO: input

  Concat: binaryOperator((a, b) => a.toString() + b.toString()),

  Id: function(ctx, args) {
    const [id] = args;
    return ctx.variables[id];
  },

  Assignment: function(ctx, args) {
    const [id, expr] = args;
    ctx.variables[id] = descent(ctx, expr);
  },

  Number: function(ctx, args) {
    return parseInt(args, 10);
  },

  Plus: binaryOperator((a, b) => a + b),
  Minus: binaryOperator((a, b) => a - b),
  Divides: binaryOperator((a, b) => Math.trunc(a / b)),
  Times: binaryOperator((a, b) => a * b),
  Eq: binaryOperator((a, b) => a === b),
  Neq: binaryOperator((a, b) => a !== b),
  Gt: binaryOperator((a, b) => a < b),
  Geq: binaryOperator((a, b) => a <= b),
  Lt: binaryOperator((a, b) => a > b),
  Leq: binaryOperator((a, b) => a >= b)
}

function evaluate(ast) {
  const buffer = [];
  try {
    ast.forEach(x => descent({buffer: buffer}, x));
  } catch(e) {
    if (e.message !== 'Semantic error') {
      throw e;
    }
    buffer.push("ERROR");
  }
  return buffer.join('');
}

export {evaluate};
