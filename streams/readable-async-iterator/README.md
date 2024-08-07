Demonstrates how to consume a stream using an async iterator.

To run:

```bash
node read-stdin.js
```

Write to the standard input and use `ctrl+d` (unix) or `ctrl+z` (windows) to end the input stream.

Alternatively, you can read from a file using the following:

```bash
cat <filename> | node read-stdin.js
```
