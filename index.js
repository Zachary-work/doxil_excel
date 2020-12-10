
import util from 'util';
import fs from 'fs';
import csv_parser from 'csv-parse';
import cal from './utils'; 

const main = async () => {
    const fileName = "Inttest.csv";
    const writeFile = util.promisify(fs.writeFile);
    const readFile = util.promisify(fs.readFile);
    const raw_data = (await readFile(`./data/${fileName}`)).toString('utf-8');

    const async_parser = util.promisify(csv_parser);

    const data = await async_parser(raw_data);
    const result_set = data.map((row, index) => {
        if(index===0){
            return;
        }
        return cal(row.slice(2, row.length), row[1]);
    }).filter((row) => {
        return row !== undefined;
    });

    const csv_string = result_set.reduce((acc, row) => {
        return acc + row.join(',') + '\n';
    }, '');

    const header = data[0].slice(2, data[0].length).join(',') + '\n';

    writeFile(`./output/${fileName}`, header + csv_string);
};

main();