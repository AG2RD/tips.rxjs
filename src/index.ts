// Hackages_LAB

// H@ck4ge$_LAB

interface Observer {
  next(val: any): any;
  error(val: any): any;
  complete(): any;
}
interface Subscription {
  unsubscribe(): any;
}

class Observable {
  constructor(private producer: (observer: Observer) => Subscription) {}
  subscribe(observer: Observer) {
    return this.producer(observer);
  }
}

function of(val: any) {
  function ofProducer(observer: Observer) {
    observer.next(val);
    return {
      unsubscribe() {
        observer.complete();
      }
    };
  }
  return new Observable(ofProducer);
}

function intervalProducer(observer: Observer) {
  let counter = 0;
  const id = setInterval(function() {
    observer.next(counter++);
  }, 1000);

  return {
    unsubscribe() {
      clearInterval(id);
    }
  };
}
const interval$ = new Observable(intervalProducer);
// const interval$ = interval(1000);

function next(val: any) {
  console.log(val);
}
function error(val: any) {
  console.log(val);
}
function complete() {
  console.log('completed...');
}

const observer: Observer = { next, error, complete };

const subscription = interval$.subscribe(observer);
