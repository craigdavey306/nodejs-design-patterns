/**
 * Importing JSON file using ESM will fail: import data from './data.json' so need to use the
 * the createRequire function to import the file.
 *
 * import.meta.url is a reference to the current module file similar to:
 *  file:///path/to/current_module.js
 *
 * import.meta.url can be used to reconstruct __filename and __dirname in the form of absolute paths:
 *
 * import { fileURLToPath } from 'url';
 * import { dirname } from 'path';
 * const __filename = fileURLToPath(import.meta.url);
 * const __dirname = dirname(__filename);
 */

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const data = require('./data.json');
console.log(data);
