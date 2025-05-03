const { performance } = require("perf_hooks");
const { Worker, workerData } = require("worker_threads");

let result = [];
let completed = 0;
const THREADS = 8;
const count = 200;

for (let i = 0; i < THREADS; i++) {
  const start = performance.now();
  const worker = new Worker("./calc.js", {
    workerData: {
      count: count / THREADS,
      start: 100_000_000_000_000 + 1 * 300_000_000_000_000,
    },
  });

  const threadId = worker.threadId;

  console.log(`Worker ${threadId} started`);

  worker.on("message", primes => {
    result = result.concat(primes);
  });

  worker.on("error", err => {
    console.error(err);
  });

  worker.on("exit", code => {
    console.log(`Worker ${threadId} exited`);
    completed++;

    if (completed === THREADS) {
      console.log(`Time Taken: ${performance.now() - start}ms`);
      console.log(result.sort());
    }

    if (code !== 0) {
      console.log(`Worker ${threadId} exited with the code ${code}`);
    }
  });
}
