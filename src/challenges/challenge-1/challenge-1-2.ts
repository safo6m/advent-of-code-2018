import { of as observableOf, throwError } from 'rxjs';
import { map, retryWhen, mergeMap, catchError } from 'rxjs/operators';
import { readFileObservable } from '../../helpers/file-reader';

const repeatedFrequencies: object = { 0: true };
let foundFrequency: number = null;
let lastCheckedFrequency: number = 0;

readFileObservable('src/challenges/challenge-1/input.txt').pipe(
  map((input: Array<string>) => input.map((i) => parseInt(i, 10))),
  mergeMap((frequencies: Array<number>) => {
    frequencies.reduce((acc: number, currentFrequency: number) => {
      lastCheckedFrequency = acc + currentFrequency;

      if (foundFrequency === null && repeatedFrequencies[lastCheckedFrequency]) {
        foundFrequency = lastCheckedFrequency;
      }

      repeatedFrequencies[lastCheckedFrequency] = true;

      return lastCheckedFrequency;
    }, lastCheckedFrequency);

    if (foundFrequency === null) {
      return throwError('Frequency not found');
    }

    return observableOf(foundFrequency);
  }),
  retryWhen((errors) => errors),
  catchError((error: any) => error)
).subscribe((result: number) => {
  console.log(result);
});
