import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { basename, join } from 'path';
import { createDecipheriv, randomBytes } from 'crypto';
import { PORT } from './constants.js';

const secret = randomBytes(24);
console.log(`Generated secret: ${secret.toString('hex')}`);

const server = createServer((req, res) => {
  // security best practice to use the basename to avoid malicious code from being injected
  // or the system files being overridden.
  const filename = basename(req.headers['x-filename']);
  const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex');
  const destFilename = join('received_files', filename);
  console.log(`File request received: ${filename}`);

  req
    .pipe(createDecipheriv('aes192', secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('OK\n');
      console.log(`File saved: ${destFilename}`);
    });
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
