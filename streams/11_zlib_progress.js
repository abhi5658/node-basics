// https://jscomplete.com/learn/node-beyond-basics/node-streams#built-in-transform-streams
const fs = require("fs");
const zlib = require("zlib");
// const file = process.argv[2];

const { Transform } = require("stream");

const reportProgress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write(".");
        callback(null, chunk);
    }
});

// fs.createReadStream(file)
fs.createReadStream("./big.file")
    .pipe(zlib.createGzip())
    .pipe(reportProgress)
    // .pipe(fs.createWriteStream(file + ".zz"))
    .pipe(fs.createWriteStream("big.file" + ".gz"))
    .on("finish", () => console.log("Done"));
