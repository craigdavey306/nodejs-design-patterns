import { createServer } from 'node:http';
import { cpus } from 'node:os';
import cluster from 'node:cluster';

// Launching app.js from the command line executes it as the primary process.
if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  // Start a worker for each CPU core.
  availableCpus.forEach(() => cluster.fork());
  // restart the worker if it wasn't explicitly terminated
  // by the main process.
  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} crashed. Starting a new worker.`
      );
      cluster.fork();
    }
  });
} else {
  // in worker mode
  // simulate an error to occur between 1 and 3 seconds
  setTimeout(() => {
    throw new Error('Oops! Worker encountered an error.');
  }, Math.ceil(Math.random() * 3) * 1000);

  const { pid } = process;
  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
  });

  server.listen(8080, () => console.log(`Started at ${pid}`));
}
