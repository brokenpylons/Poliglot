import {isValue, isCommand, isList} from './ast';

class SemanticError extends Error {}

async function descent(ctx, ast, previous) {
  const [c, ...args] = ast;
  return await table[c](ctx, args, previous);
}

async function iterate(ctx, a) {
  let previous;
  for (let x of a) {
    previous = await descent(ctx, x, previous);
  }
}

function binaryOperator(fun) {
  return async (ctx, args) => {
    const [a, b] = args;
    return fun(await descent(ctx, a), await descent(ctx, b), ctx);
  }
}

function unaryOperator(fun) {
  return async (ctx, args) => {
    const [a] = args;
    return fun(await descent(ctx, a));
  }
}

const next = Symbol('next');

const table = {
  Program: async function(ctx, args) {
    const [stmts] = args;
    ctx.variables = {};
    await iterate(ctx, stmts);
  },

  If: async function(ctx, args) {
    const [expr, stmts] = args;
    if (await descent(ctx, expr)) {
      await iterate(ctx, stmts);
      return {[next]: false};
    }
    return {[next]: true};
  },

  Elseif: async function(ctx, args, previous) {
    if (previous == null || previous[next] == null) {
      throw new SemanticError("Semantic error")
    }

    const [expr, stmts] = args;
    if (!previous[next]) {
      return {[next]: false};
    }

    if (await descent(ctx, expr)) {
      await iterate(ctx, stmts);
      return {[next]: false};
    }
    return {[next]: true};
  },

  Else: async function(ctx, args, previous) {
    if (previous == null || previous[next] == null) {
      throw new SemanticError("Semantic error")
    }

    if (!previous[next]) {
      return;
    }

    const [stmts] = args;
    await iterate(ctx, stmts);
  },

  While: async function(ctx, args) {
    const [expr, stmts] = args;
    for (let i = 0; i < 100 && await descent(ctx, expr); i++) {
      await iterate(ctx, stmts);
    }
  },

  And: binaryOperator((a, b) => (a && b)|0),
  Or: binaryOperator((a, b) => (a || b)|0),
  Not: unaryOperator((a) => (!a)|0),

  String: function(ctx, args) {
      const [string] = args;
      return string;
  },

  Print: async function(ctx, args) {
    const [expr] = args;
    ctx.print(await descent(ctx, expr));
  },

  Line: function(ctx) {
      return '\n';
  },

  Input: async function(ctx) {
    return await ctx.input();
  },

  Concat: binaryOperator((a, b) => a.toString() + b.toString()),

  Id: function(ctx, args) {
    const [id] = args;
    if (!(id in ctx.variables)) {
      ctx.error("Nedefinirana spremenljivka");
    }
    return ctx.variables[id];
  },

  Assignment: async function(ctx, args) {
    const [id, expr] = args;
    ctx.variables[id] = await descent(ctx, expr);
  },

  Number: function(ctx, args) {
    return parseInt(args, 10);
  },

  Plus: binaryOperator((a, b) => a + b),
  Minus: binaryOperator((a, b) => a - b),
  Divides: binaryOperator((a, b, ctx) => {
    if (a == 0 && b == 0) {
      ctx.error("Nedoločeno");
      throw 0;
    }
    if (b == 0) {
      ctx.error("Nedefinirano");
      throw 0;
    }
    return Math.trunc(a / b);
  }),
  Times: binaryOperator((a, b) => a * b),
  Eq: binaryOperator((a, b) => (a === b)|0),
  Neq: binaryOperator((a, b) => (a !== b)|0),
  Gt: binaryOperator((a, b) => (a < b)|0),
  Geq: binaryOperator((a, b) => (a <= b)|0),
  Lt: binaryOperator((a, b) => (a > b)|0),
  Leq: binaryOperator((a, b) => (a >= b)|0)
}

async function evaluate(ast, print, input, error, delimiter) {
  try {
    for (let node of ast) {
      await descent({print, input, error}, node);
      delimiter();
    }
  } catch(e) {
    if (e instanceof SemanticError) {
      print("ERROR");
    } else {
      throw e;
    }
  }
}

export {evaluate};
