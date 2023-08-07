//kepping the cpu intense task here not on the main thread

const { parentPost, parentPort } = require("worker_threads");
//Receive data from main thread and running task by a callback fun on another thread
parentPort.on("message", (jobs) => {
  //count to 1 billion
  for (let job of jobs) {
    let count = 0;
    for (let i = 0; i < jobs; i++) {
      count++;
    }
  }

  parentPort.postMessage("Done");
});
