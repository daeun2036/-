setImmediate(() => {
    console.log('immediate');
  });

process.nextTick(() => {
    console.log('nextTick');
});

setTimeout(() => {
    console.log('timeout');
},0);

Promise.resolve().then(() => console.log('promise')); // promise도 다른 콜백들보다 우선시됨