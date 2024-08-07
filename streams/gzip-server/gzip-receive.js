import { createServer } from 'node:http';
import { createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { basename, join } from 'node:path';
import { PORT } from './constants.js';

const server = createServer((req, res) => {
  // security best practice to use the basename to avoid malicious code from being injected
  // or the system files being overridden.
  const filename = basename(req.headers['x-filename']);
  const destFilename = join('received_files', filename);
  console.log(`File request received: ${filename}`);

  req
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('OK\n');
      console.log(`File saved: ${destFilename}`);
    });
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
