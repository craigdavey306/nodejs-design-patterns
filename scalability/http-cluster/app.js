/**
 * node:cluster has the following pattern for running multiple instances of an 
 * application:
 * 
   if (cluster.isPrimary) {
     // call fork() to start a worker
   } else {
     // do work here 
   }

   Broadcasting a message from the primary process to the workers can be
   achieved with the following code:

   Object.values(cluster.workers).forEach((worker) => worker.send('Hello from the main process'));
 * 
 */

import { createServer } from 'node:http';
import { cpus } from 'node:os';
import cluster from 'node:cluster';

// Launching app.js from the command line executes it as the primary process.
if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  // Start a worker for each CPU core.
  availableCpus.forEach(() => cluster.fork());
} else {
  // in worker mode
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
