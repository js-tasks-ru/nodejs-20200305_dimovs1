const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    const {limit, encoding = 'utf8'} = options;
    this._limit = limit;
    this.setEncoding(encoding);
    this._currentAmount = 0;
  }

  _transform(chunk, encoding, callback) {
    this._currentAmount += chunk.length;

    if (this._currentAmount > this._limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
