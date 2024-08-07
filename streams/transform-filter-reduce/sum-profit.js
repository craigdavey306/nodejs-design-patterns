import { Transform } from 'node:stream';

export class SumProfit extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.total = 0;
  }

  // transform is being used here for streaming aggregation
  _transform(record, encoding, cb) {
    this.total += Number.parseFloat(record.profit);
    cb();
  }

  // emits the result when all of the data has been processed
  _flush(cb) {
    this.push(this.total.toString());
    cb();
  }
}
