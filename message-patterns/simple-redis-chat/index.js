import { createServer } from 'node:http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';
import { Redis } from 'ioredis';

const redisSub = new Redis();
const redisPub = new Redis();

// Serve static files.
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'static' });
});

const wss = new WebSocketServer({ server });

wss.on('connection', (client) => {
  console.log('Client connected');
  client.on('message', (msg) => {
    console.log(`Message: ${msg}`);
    redisPub.publish('chat_messages', msg);
  });
});

redisSub.subscribe('chat_messages');
redisSub.on('message', (channel, msg) => {
  console.log('on message');
  for (const client of wss.clients) {
    console.log(client.readyState);
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
});

server.listen(process.argv[2] || 8080);
