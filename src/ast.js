// TODO: Unused!!!

function isValue(ast) {
  return typeof ast === 'string';
}

function isCommand(ast) {
  return Array.isArray(ast) && typeof ast[0] === 'string';
}

function isList(ast) {
  return Array.isArray(ast) && typeof ast[0] !== 'string';
}

export {isValue, isCommand, isList};
