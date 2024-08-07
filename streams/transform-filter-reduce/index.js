import { createReadStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { parse } from 'csv-parse';
import { FilterByCountry } from './filter-by-country.js';
import { SumProfit } from './sum-profit.js';

const csvParser = parse({ columns: true });

createReadStream('data.csv.gz')
  .pipe(createGunzip())
  .pipe(csvParser)
  .pipe(new FilterByCountry('Italy'))
  .pipe(new SumProfit())
  .pipe(process.stdout);
