# Reslient HTTP Cluster

Demonstrates an HTTP server using workers that crash and restart for benchmarking.

## Run

```bash
npm start
```

In a second terminal, run a benchmark by running:

```bash
npm benchmark
```

The benchmark will run 200 concurrent connections for 10 seconds.

Can roughly determine the availability with the following formula:
(number of requests - number of crashes) / number of request \* 100
