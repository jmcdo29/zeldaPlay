const { from, of } = require('rxjs');
const { catchError } = require('rxjs/operators');

const rejectedPromise = () => new Promise((resolve, reject) => {
  reject('Rejected');
});

const example = from(rejectedPromise()).pipe(
  catchError((err) => {
    return of('I caught error: ' + err);
  })
);

example.subscribe(result => console.log(result));
