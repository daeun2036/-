const { 
    Worker, isMainThread, parentPort,
  } = require('worker_threads'); // worker_threads 모듈

if(isMainThread){ // 부모일 때
    // new Worker를 통해 현재 파일을 워커 스레드에서 실행
    const worker = new Worker(__filename);
    worker.on('message',message => console.log('from worker',message));
    worker.on('exit',() => console.log('worker exit'));
    worker.postMessage('ping');
} else { // worker일 때
    parentPort.on('message', value => {
        console.log('from parent',value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}