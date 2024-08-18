import { EventEmitter } from 'node:events';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ThreadPool } from './threadPool.js';

const WORKER_DIRECTORY = 'workers';
const WORKER_PGM = 'subsetSumThreadWorker.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerFile = join(__dirname, WORKER_DIRECTORY, WORKER_PGM);
const workers = new ThreadPool(workerFile, 2);

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  async start() {
    const worker = await workers.acquire();
    worker.postMessage({ sum: this.sum, set: this.set });

    const onMessage = (msg) => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage);
        workers.release(worker);
      }

      this.emit(msg.event, msg.data);
    };

    worker.on('message', onMessage);
  }
}
