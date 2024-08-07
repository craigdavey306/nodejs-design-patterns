import { Transform } from 'node:stream';

/**
 * Custom Transform stream that allows a client to specify a country name.
 */
export class FilterByCountry extends Transform {
  constructor(country, options = {}) {
    options.objectMode = true;
    super(options);
    this.country = country;
  }

  // transform is being used here as a filter
  _transform(record, encoding, cb) {
    if (record.country === this.country) {
      this.push(record);
    }

    cb();
  }
}
