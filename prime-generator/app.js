const { performance } = require("perf_hooks");
const generatePrimes = require("./prime-generator");

const start = performance.now();

console.log(generatePrimes(200, 100_000_000_000_000_000n));

console.log(`Time Taken: ${performance.now() - start}ms`);
