// enable mock in dev mode.
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./browser');
  worker.start();
}

export {};
