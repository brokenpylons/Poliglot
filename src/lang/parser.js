const parser = window.parser;

class ParseError extends Error {
  constructor(message, hash, ...params) {
    super(...params);
    this.message = message;
    Object.assign(this, hash);
  }
}

parser.yy.parseError = function(message, hash) {
  throw new ParseError(message, hash);
}

export default parser;
export {ParseError};
