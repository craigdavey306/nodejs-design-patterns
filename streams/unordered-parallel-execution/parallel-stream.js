import { Transform } from 'node:stream';

// Executes tasks in parallel, but does not preserve the order of the items
// as they are received.
export class ParallelStream extends Transform {
  constructor(userTransform, options = {}) {
    super({ objectMode: true, ...options });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
  }

  _transform(chunk, encoding, done) {
    this.running++;
    this.userTransform(
      chunk,
      encoding,
      this.push.bind(this),
      this._onComplete.bind(this)
    );

    done();
  }

  // invoked before the stream terminates
  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  // called every time an asynchronous task completes
  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }

    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}
