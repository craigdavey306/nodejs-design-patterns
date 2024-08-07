Demonstrates sending an unencrypted stream of data from a client (gzip-send.js) to the server (gzip-receive.js).

First start the server (runs on localhost):

```bash
node gzip-receive.js
```

Secondly, send data from the client to the server:

```bash
node gzip-send.js <filename> <server>
```

Example of sending data from the client to the server:

```bash
node gzip-send.js url-list.txt localhost
```
