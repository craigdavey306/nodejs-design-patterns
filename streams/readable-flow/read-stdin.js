process.stdin
  .on('readable', (chunk) => {
    console.log('New data available');
    console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
  })
  .on('end', () => console.log('End of stream'));
