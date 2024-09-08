import { createServer } from 'node:http';
import { cpus } from 'node:os';
import { once } from 'node:events';
import cluster from 'node:cluster';

// Launching app.js from the command line executes it as the primary process.
if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(
    `Clustering to ${availableCpus.length} processes on main process: ${process.pid}`
  );
  // Start a worker for each CPU core.
  availableCpus.forEach(() => cluster.fork());

  // Restart the process if it crashed
  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} crashed. Starting a new worker.`
      );
      cluster.fork();
    }
  });

  // Restart the workers one at a time when SIGUSR2 signal is received.
  // Since this is using Unix signals, this won't work on Windows. Other
  // options are available such as listening for a command coming from a
  // socket, a pipe, or the standard input.
  process.on('SIGUSR2', async () => {
    console.log(`\n\nSIGUSR2 signal recieved...\n`);
    const workers = Object.values(cluster.workers);
    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect();
      await once(worker, 'exit');
      if (!worker.exitedAfterDisconnect) continue;
      const newWorker = cluster.fork();
      await once(newWorker, 'listening');
    }
  });
} else {
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
