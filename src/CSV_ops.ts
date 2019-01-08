import parse from 'csv-parse/lib/sync';
import stringify from 'csv-stringify';
import { readFileSync } from 'fs';

export const loader = (filename: string) => {
  const content = readFileSync(filename, 'utf8');
  const trimmedContent = content
  const data = parse(trimmedContent,{relax_column_count: true, relax: true});
  return data;
}

export const convertToCSV = (output: string[][]) => {
    return new Promise ((resolve,fail) => {
        stringify(output, (err, outputData) => {
            if (!err) {
                resolve(outputData as string[][]);
            } else {
                fail(err);
            }
        });
    })
}

//   return await stringifyPromise as string[][];