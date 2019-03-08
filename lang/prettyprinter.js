function PrettyPrinter() {

  const indent = '    '

  /* core */
  function empty() { 
    return (i) => null;
  }

  function nest(arg) {
    return (i) => arg(i + 1); 
  }

  function append(...args) {
    return (i) => args.map((arg) => arg(i)).reduce((acc, x) => acc + x, '');
  }

  function line() {
    return (i) => '\n' + indent.repeat(i);
  }

  function text(str) {
    return (i) => str;
  }

  /* derived */
  function space() {
    return text(' ');
  }

  /* utility */
  function assert(expected, actual) {
    if (expected !== actual) {
      console.trace();
      throw 0;
    }
  }

  function unit(ast) {
    return append(...ast.map(x => program(x)));
  }

  function program(ast) {
    let [command, arg1] = ast;
    assert('Program', command);
    return append(text('program'), space(), block(arg1), line());
  }

  function stmt(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'Assignment':
        return stmt_1(...args);
      case 'If':
        return stmt_2(...args);
      case 'Elseif':
        return stmt_3(...args);
      case 'Else':
        return stmt_4(...args);
      case 'While':
        return stmt_5(...args);
      case 'Print':
        return stmt_6(...args);
    }
  }

  function stmt_1(arg1, arg2) {
    return append(line(), text(arg1), text(':'), space(), expr(arg2), text(';'));
  }

  function stmt_2(arg1, arg2) {
    return append(line(), text('if'), space(), parent(arg1), space(), block(arg2));
  }

  function stmt_3(arg1, arg2) {
    return append(line(), text('else'), space(), text('if'), space(), parent(arg1), space(), block(arg2));
  }

  function stmt_4(arg1) {
    return append(line(), text('else'), space(), block(arg1));
  }

  function stmt_5(arg1, arg2) {
    return append(line(), text('while'), space(), parent(arg1), space(), block(arg2));
  }

  function stmt_6(arg1) {
    return append(line(), text('print'), space(), printable(arg1), text(';'));
  }

  function parent(ast) {
    return append(text('('), expr(ast), text(')'));
  }

  function block(ast) {
    return append(text('{'), nest(append(...ast.map(x => stmt(x)))), line(), text('}'));
  }

  function printable(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'Concat':
        return printable_1(...args);
      case 'And':
      case 'Or':
      case 'Not':
      case 'Lt':
      case 'Gt':
      case 'Eq':
      case 'Leq':
      case 'Geq':
      case 'Neq':
      case 'Plus':
      case 'Minus':
      case 'Times':
      case 'Divides':
      case 'DividesInt':
      case 'Number':
      case 'Id':
      case 'Input':
      case 'String':
      case 'Line':
        return printable_2(ast);
    }
  }

  function printable_1(arg1, arg2) {
    return append(printable1(arg1), space(), printable(arg2));
  }

  function printable_2(ast) {
    return printable1(ast);
  }

  function printable1(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'And':
      case 'Or':
      case 'Not':
      case 'Lt':
      case 'Gt':
      case 'Eq':
      case 'Leq':
      case 'Geq':
      case 'Neq':
      case 'Plus':
      case 'Minus':
      case 'Times':
      case 'Divides':
      case 'DividesInt':
      case 'Number':
      case 'Id':
      case 'Input':
        return printable1_1(ast);
      case 'String':
        return printable1_2(...args);
      case 'Line':
        return printable1_3(...args);
    }
  }

  function printable1_1(ast) {
    return expr(ast);
  }

  function printable1_2(arg1) {
    return append(text('"'), text(arg1), text('"'));
  }

  function printable1_3() {
    return text('line');
  }

  function expr(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'And':
        return expr_1(...args);
      case 'Or':
        return expr_2(...args);
      case 'Not':
        return expr_3(...args);
      case 'Lt':
      case 'Gt':
      case 'Eq':
      case 'Leq':
      case 'Geq':
      case 'Neq':
      case 'Plus':
      case 'Minus':
      case 'Times':
      case 'Divides':
      case 'DividesInt':
      case 'Number':
      case 'Id':
      case 'Input':
        return expr_4(ast);
    }
  }

  function expr_1(arg1, arg2) {
    return append(expr(arg1), space(), text('and'), space(), expr1(arg2));
  }

  function expr_2(arg1, arg2) {
    return append(expr(arg1), space(), text('or'), space(), expr1(arg2));
  }

  function expr_3(arg1) {
    return append(text('not'), space(), expr1(arg1));
  }

  function expr_4(ast) {
    return expr1(ast);
  }

  function expr1(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'Lt':
        return expr1_1(...args);
      case 'Gt':
        return expr1_2(...args);
      case 'Eq':
        return expr1_3(...args);
      case 'Leq':
        return expr1_4(...args);
      case 'Geq':
        return expr1_5(...args);
      case 'Neq':
        return expr1_6(...args);
      case 'Plus':
      case 'Minus':
      case 'Times':
      case 'Divides':
      case 'DividesInt':
      case 'Number':
      case 'Id':
      case 'Input':
      case 'And':
      case 'Or':
      case 'Not':
        return expr1_7(ast);
    }
  }

  function expr1_1(arg1, arg2) {
    return append(expr1(arg1), space(), text('>'), space(), expr2(arg2));
  }

  function expr1_2(arg1, arg2) {
    return append(expr1(arg1), space(), text('<'), space(), expr2(arg2));
  }

  function expr1_3(arg1, arg2) {
    return append(expr1(arg1), space(), text('='), space(), expr2(arg2));
  }

  function expr1_4(arg1, arg2) {
    return append(expr1(arg1), space(), text('>='), space(), expr2(arg2));
  }

  function expr1_5(arg1, arg2) {
    return append(expr1(arg1), space(), text('<='), space(), expr2(arg2));
  }

  function expr1_6(arg1, arg2) {
    return append(expr1(arg1), space(), text('/='), space(), expr2(arg2));
  }

  function expr1_7(ast) {
    return expr2(ast);
  }

  function expr2(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'Plus':
        return expr2_1(...args);
      case 'Minus':
        return expr2_2(...args);
      case 'Times':
      case 'Divides':
      case 'DividesInt':
      case 'Number':
      case 'Id':
      case 'Input':
      case 'And':
      case 'Or':
      case 'Not':
      case 'Lt':
      case 'Gt':
      case 'Eq':
      case 'Leq':
      case 'Geq':
      case 'Neq':
        return expr2_3(ast);
    }
  }

  function expr2_1(arg1, arg2) {
    return append(expr2(arg1), space(), text('+'), space(), expr3(arg2));
  }

  function expr2_2(arg1, arg2) {
    return append(expr2(arg1), space(), text('-'), space(), expr3(arg2));
  }

  function expr2_3(ast) {
    return expr3(ast);
  }

  function expr3(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'Times':
        return expr3_1(...args);
      case 'Divides':
        return expr3_2(...args);
      case 'DividesInt':
        return expr3_3(...args);
      case 'Number':
      case 'Id':
      case 'Input':
      case 'And':
      case 'Or':
      case 'Not':
      case 'Lt':
      case 'Gt':
      case 'Eq':
      case 'Leq':
      case 'Geq':
      case 'Neq':
      case 'Plus':
      case 'Minus':
        return expr3_4(ast);
    }
  }

  function expr3_1(arg1, arg2) {
    return append(expr3(arg1), space(), text('*'), space(), expr4(arg2));
  }

  function expr3_2(arg1, arg2) {
    return append(expr3(arg1), space(), text('/'), space(), expr4(arg2));
  }

  function expr3_3(arg1, arg2) {
    return append(expr3(arg1), space(), text('//'), space(), expr4(arg2));
  }

  function expr3_4(ast) {
    return expr4(ast);
  }

  function expr4(ast) {
    let [command, ...args] = ast;
    switch (command) {
      case 'Number':
        return expr4_1(...args);
      case 'Id':
        return expr4_2(...args);
      case 'Input':
        return expr4_3(...args);
      case 'And':
      case 'Or':
      case 'Not':
      case 'Lt':
      case 'Gt':
      case 'Eq':
      case 'Leq':
      case 'Geq':
      case 'Neq':
      case 'Plus':
      case 'Minus':
      case 'Times':
      case 'Divides':
      case 'DividesInt':
        return expr4_4(ast);
    }
  }

  function expr4_1(arg1) {
    return text(arg1);
  }

  function expr4_2(arg1) {
    return text(arg1);
  }

  function expr4_3() {
    return text('input');
  }

  function expr4_4(ast) {
    return append(text('('), expr(ast), text(')'));
  }

  this.print = function(ast) {
    return unit(ast)(0);
  }
}
