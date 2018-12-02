import * as readline from 'readline';
import * as fs from 'fs';
import { bindCallback } from 'rxjs';

function _readline(
  filePath: string,
  processLinesCb: (lines: Array<string>) => void
): void {
  const lines: Array<string> = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  rl.on('line', (line: string) => {
    lines.push(line);
  });

  rl.on('close', () => {
    processLinesCb(lines);
  });
}

export const readFileObservable = bindCallback(_readline);
