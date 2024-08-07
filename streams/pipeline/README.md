Demonstrates how to create a more complicated pipleline using `stream.pipeline()`.

To Run:

```bash
echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip
```

To make the stream fail, remove `gunzip`:

```bash
echo 'Hello World!' | gzip | node uppercasify-gzipped.js
```
