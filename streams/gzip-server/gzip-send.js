import { request } from 'node:http';
import { createGzip } from 'node:zlib';
import { createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { PORT } from './constants.js';

const filename = process.argv[2];
const serverHost = process.argv[3];
const httpRequestOptions = {
  hostname: serverHost,
  port: PORT,
  path: '/',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    'X-Filename': basename(filename),
  },
};

const req = request(httpRequestOptions, (res) => {
  console.log(`Server response: ${res.statusCode}`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent');
  });
