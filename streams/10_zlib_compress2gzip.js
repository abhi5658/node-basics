// https://jscomplete.com/learn/node-beyond-basics/node-streams#built-in-transform-streams
const fs = require("fs");
const zlib = require("zlib");
// const file = process.argv[2];

// fs.createReadStream(file)
fs.createReadStream("./big.file")
    .pipe(zlib.createGzip())
    .on("data", () => process.stdout.write("."))
    // .pipe(fs.createWriteStream(file + ".zz"))
    .pipe(fs.createWriteStream("big.file" + ".gz"))
    .on("finish", () => console.log("Done"));
