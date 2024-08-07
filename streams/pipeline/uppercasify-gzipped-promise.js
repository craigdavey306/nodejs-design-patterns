// Demonstrates the same logic with Promises.

import { createGzip, createGunzip } from 'node:zlib';
import { Transform, pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipelinePromise = promisify(pipeline);

// Transforms each chunk into uppercase
const uppercasify = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

async function main() {
  try {
    await pipelinePromise(
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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
