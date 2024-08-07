import { Transform } from 'node:stream';

export class ReplaceStream extends Transform {
  constructor(searchStr, replaceStr, options = {}) {
    super({ ...options });
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.tail = '';
  }

  _transform(chunk, encoding, callback) {
    const pieces = (this.tail + chunk).split(this.searchStr);
    const lastPiece = pieces[pieces.length - 1];
    const tailLength = this.searchStr.length - 1;
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLength);

    this.push(pieces.join(this.replaceStr));
    callback();
  }

  _flush(callback) {
    this.push(this.tail);
    callback();
  }
}
