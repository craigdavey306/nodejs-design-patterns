import { createGzip, createGunzip } from 'node:zlib';
import { Transform, pipeline } from 'node:stream';

// Transforms each chunk into uppercase
const uppercasify = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

pipeline(
  process.stdin,
  createGunzip(),
  uppercasify,
  createGzip(),
  process.stdout,
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
);
