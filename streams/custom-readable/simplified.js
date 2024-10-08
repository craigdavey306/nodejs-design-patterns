/**
 * Simplifies the construction of a custom Readable stream by eliminating the need to create a class.
 */

import { Readable } from 'node:stream';
import Chance from 'chance';

const chance = new Chance();
let emittedBytes = 0;
const randomStream = new Readable({
  read(size) {
    const chunk = chance.string({ length: size });
    this.push(chunk, 'utf-8');
    emittedBytes += chunk.length;

    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  },
});

randomStream
  .on('data', (chunk) => {
    console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`);
  })
  .on('end', () => {
    console.log(`Produced ${randomStream.emittedBytes} bytes of random data`);
  });
