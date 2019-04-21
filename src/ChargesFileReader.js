const fs = require('fs');
const JSONStream = require('JSONStream');

const DEFAULT_BATCH_SIZE = 5000;
const EventEmitter = require('events');

class ChargesFileReader extends EventEmitter {
  constructor(filename) {
    super();

    if (!filename) {
      throw new Error('filename is required!');
    }

    const stream = fs.createReadStream(filename, { encoding: 'utf8' });
    const parser = JSONStream.parse('*');

    stream.pipe(parser);

    this.parser = parser;
    this.charges = [];
  }

  read(batchSize = DEFAULT_BATCH_SIZE) {
    this.parser.on('data', (charge) => {
      this.charges.push(charge);

      if (this.charges.length >= batchSize) {
        this.emit('data', this.charges);
        this.charges = [];
      }
    }).on('end', () => {
      if (this.charges.length !== 0) {
        this.emit('data', this.charges);
      }
      this.emit('end');
    });
    return this;
  }
}

module.exports = { ChargesFileReader: ChargesFileReader };
