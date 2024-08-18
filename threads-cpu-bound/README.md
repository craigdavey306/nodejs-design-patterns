Demonstrates how to uses threads for running CPU-bound tasks in Node.js.

To start the server:

```bash
node index.js
```

Send one or more requests to the server triggering the sum subset logic:

```bash
  curl -G http://localhost:8000/subsetSum --data-urlencode "data=[116,119,101,101,-116,109,101,-105,-102,117,-115,-97,119,-116,-104,-105,115]" --data-urlencode "sum=0"
```

While a task is running, you can check the responsive of the server using the following command:

```bash
  curl -G http://localhost:8000
```
