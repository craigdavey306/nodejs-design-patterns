Demonstrates how to consume a stream in flow mode.

There are two types of modes for readable streams: _non-flowing_ (or paused) and _flowing_. The _non-flowing_ mode is the default pattern for reading from a Readable stream. In _flowing_ mode, data is pushed to the listener as soon as it arrives. Flowing mode offers less flexibility to control the flow of data compared to non-flowing mode.

To run:

```bash
node read-stdin.js
```

Write to the standard input and use `ctrl+d` (unix) or `ctrl+z` (windows) to end the input stream.

Alternatively, you can read from a file using the following:

```bash
cat <filename> | node read-stdin.js
```
