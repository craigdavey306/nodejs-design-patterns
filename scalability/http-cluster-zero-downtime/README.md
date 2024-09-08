# Zero Downtime HTTP Cluster

Demonstrates an HTTP server using that restarts workers when a SIGUSR2 signal is received by the main process.

## Run

To obtain the PID of the main process:

```bash
ps -af
```

```bash
npm start
```

In a second terminal, send the SIGUSR2 signal:

```bash
kill -SIGUSR2 <PID>
```

In a second terminal, run a benchmark by running:

```bash
npm benchmark
```

The benchmark will run 200 concurrent connections for 10 seconds.

Can roughly determine the availability with the following formula:
(number of requests - number of crashes) / number of request \* 100
