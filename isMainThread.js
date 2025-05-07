const { Worker, isMainThread, threadId } = require("worker_threads");

if (isMainThread === true) {
  const worker = new Worker("./isMainThread.js");
  console.log("Main thread", threadId);
} else {
  console.log("Worker thread", threadId);
}
