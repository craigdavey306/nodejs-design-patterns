import { createServer } from 'node:http';
import Chance from 'chance';

const PORT = 8080;

const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  while (chance.bool({ likelihood: 5 })) {
    res.write(`${chance.string()}\n`);
  }

  res.end('\n\n');
  res.on('finish', () => console.log('All data sent'));
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
