import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    const  promise = new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);',
            [],
            ()=> {
                resolve();
            },
            (_, err)=> {
                reject();
            })
        })
    });
    return promise;
}

export const insertData = (title, imageUri, address, latitude, longitude) => {
    const promise = new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (? ,? ,? ,? ,?);`,
            [title, imageUri, address, latitude, longitude],
            (_,result)=> {
                resolve(result);
            },
            (_,err)=> {
                reject(err);
            }
            );
        });
    });
    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM places;",
            [],
            (_,result)=> {
                resolve(result);
            },
            (_, err)=> {
                reject(err);
            }
            );
        })
    });
    return promise;
}
