"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const sqlite3_1 = require("sqlite3");
const DBSOURCE = "db.sqlite";
exports.DB = new sqlite3_1.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        exports.DB.run(`CREATE TABLE property (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address text,
            thumbnail text,
            image text,
            price integer,
            createdOn Datetime,
            updatedOn Datetime
        )`, (createError) => {
            if (!createError) {
                // Insert dummy data
                const insert = "INSERT INTO property (address, thumbnail, image, price, createdOn, updatedOn) VALUES(?,?,?,?,?,?)";
                exports.DB.run(insert, [
                    "234 Some Place\nSomwhere\nOver the Rainbow\nTW33DE",
                    "rainbow.jpg",
                    "rainbow.jpg",
                    215000,
                    new Date().toISOString(),
                    new Date().toISOString(),
                ]);
                exports.DB.run(insert, [
                    "190 Camac Road\nTwickenham\nLondon\nTW20 7NY",
                    "camac.jpg",
                    "camac.jpg",
                    215000,
                    new Date().toISOString(),
                    new Date().toISOString(),
                ]);
                exports.DB.run(insert, [
                    "12 Cranbrook Road\nSmallsville\nKingston\nKT10 1ER",
                    "kingston.jpg",
                    "kingston.jpg",
                    667000,
                    new Date().toISOString(),
                    new Date().toISOString(),
                ]);
                exports.DB.run(insert, [
                    "10a Major Road\nStratford\nE15 1TT",
                    "stratford.jpg",
                    "stratford.jpg",
                    585000,
                    new Date().toISOString(),
                    new Date().toISOString(),
                ]);
                exports.DB.run(insert, [
                    "Castle Place\nLewes\nSussex-by-the-sea\nBN7 7AA",
                    "castle-place.jpg",
                    "castle-place.jpg",
                    585000,
                    new Date().toISOString(),
                    new Date().toISOString(),
                ]);
            }
        });
    }
});
//# sourceMappingURL=db.js.map