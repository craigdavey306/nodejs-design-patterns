Demonstrates sending an encrypted stream of data from a client (crypto-gzip-client.js) to the server (crypto-gzip-server.js).

First start the server (runs on localhost):

```bash
node cryto-gzip-server.js
```

Secondly, send data from the client to the server:

```bash
node crypto-gzip-client.js <filename> <server> <secret>
```

Example of sending data from the client to the server:

```bash
node crypto-gzip-client.js url-list.txt localhost mysecret
```
