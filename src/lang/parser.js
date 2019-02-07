const parser = window.parser;

class ParseError extends Error {}

parser.yy.parseError = function(message, hash) {
  throw new ParseError(message);
}

export default parser;
export {ParseError};
