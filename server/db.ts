import * as fs         from 'fs';
import * as csv        from 'fast-csv';
import * as Datastore  from 'nedb';
import { environment } from '../common/environment';

global.db = new Datastore(); // in-memory

export class DB {
    initDB() : Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let   csvData   = [];
                const stream    = fs.createReadStream(environment.db.csv);

                const streamCsv = csv.parse({
                    headers   : true,
                    delimiter : ';'
                }).on('error', error => {
                    console.error(error);
                }).on('data', data => {
                    data.producers = data.producers.replace(/ and /gi, ", ").split(", ");
                    csvData.push(data);
                }).on('end', (rowCount: number) => {
                    console.log(`Parsed ${rowCount} rows`);
                    global.db.insert(csvData, (err: any, newDocs: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newDocs);
                        }
                    });
                });

                stream.pipe(streamCsv);
            } catch(error) {
                reject(error);
            }
        });
    }

    bootstrap(): Promise<DB> {
        return this.initDB().then(() => this);
    }
}