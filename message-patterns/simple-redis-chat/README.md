# Redis Chat

Demonstrates a simple chat application using Redis as a message broker to integrate different server instances.

## To Run

Install dependencies:

```bash
npm install
```

In two separate terminals, run the following:

```bash
node index.js 8081
node index.js 8082
```

To access the application, open a browser tab at address:

```bash
http://localhost:8081
```

Then, open a second browser tab at the following address:

```bash
http://localhost:8082
```
