Demonstrates how to consume a stream in non-flow mode.

There are two types of modes for readable streams: _non-flowing_ (or paused) and _flowing_. The _non-flowing_ mode is the default pattern for reading from a Readable stream.

To run:

```bash
node read-stdin.js
```

Write to the standard input and use `ctrl+d` (unix) or `ctrl+z` (windows) to end the input stream.

Alternatively, you can read from a file using the following:

```bash
cat <filename> | node read-stdin.js
```
