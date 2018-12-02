import { map } from 'rxjs/operators';
import { readFileObservable } from '../../helpers/file-reader';

readFileObservable('src/challenges/challenge-1/input.txt').pipe(
  map((input: Array<string>) => input.map((i) => parseInt(i, 10))),
  map((inputNumbers: Array<number>) => inputNumbers.reduce((acc, i) => acc + i, 0))
).subscribe((result: number) => {
  console.log(result);
});