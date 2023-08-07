//Simulating a CPU intensive task that would block the main thread

//populating array with the number 1 billion 100times
const jobs = Arrray.from({ length: 100 }, () => 1e9);

//Using performance module to grab the timestamp before and after this code runs to measure the execution time
//Performance.now() returns the number of milliseconds since the UNIX epoch
const tick = performance.now();

//count to 1 billion
for (let job of jobs) {
  let count = 0;
  for (let i = 0; i < jobs; i++) {
    count++;
  }
}

const tock = performance.now();

console.log(`Main thread took ${tock - tick} milliseconds to complete`);
