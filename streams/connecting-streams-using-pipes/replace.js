import { ReplaceStream } from './replace-stream.js';

const searchStr = process.argv[2];
const replaceStr = process.argv[3];

process.stdin
  .pipe(new ReplaceStream(searchStr, replaceStr))
  .pipe(process.stdout);
