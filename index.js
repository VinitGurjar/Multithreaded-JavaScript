import { Worker } from "workers_threads";

function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return chunks;
}

function run(jobs, concurrentWorkers) {
  const chunks = chunkify(jobs, concurrentWorkers);

  const tick = performance.now();
  let completedWorkers = 0;

  chunks.forEach((data, i) => {
    const worker = new Worker("./worker.js");
    worker.postMessage(data);

    //Listen to messages on main thread
    worker.on("message", () => {
      //listen to workers
      console.log(`Worker ${i} finished`);
      completedWorkers++;
      if (completedWorkers === concurrentWorkers) {
        console.log(
          `${concurrentWorkers} workers took ${
            performance.now() - tick
          } milliseconds to complete`
        );
        process.exit();
      }
    });
  });
}

/* old code

//Simulating a CPU intensive task that would block the main thread

//populating array with the number 1 billion 100times
const jobs = Array.from({ length: 100 }, () => 1e9);

//Using performance module to grab the timestamp before and after this code runs to measure the execution time
//Performance.now() returns the number of milliseconds since the UNIX epoch
const tick = performance.now();

const tock = performance.now();

console.log(`Main thread took ${tock - tick} milliseconds to complete`);

*/
