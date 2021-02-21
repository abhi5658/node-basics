// https://jscomplete.com/learn/node-beyond-basics/node-streams#built-in-transform-streams
const crypto = require("crypto");

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

// const iv = crypto.randomBytes(16);
// console.log('iv', iv.toString('hex'));

/**
 * Run first encrypt by commenting DECRYPT
 * Then run decrypt by commenting ENCRYPT
 */
// ENCRYPT
// fs.createReadStream(file)
fs.createReadStream("./big.file")
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipher("aes192", "the_strong_secret")) // depreacted
    // .pipe(crypto.createCipheriv("aes-256-gcm", Buffer.from("the_strong_secret", 'hex'), iv))
    .pipe(reportProgress)
    // .pipe(fs.createWriteStream(file + ".gz"))
    .pipe(fs.createWriteStream("big.file" + ".gz"))
    .on("finish", () => console.log("Done"));


// DECRYPT
// fs.createReadStream(file)
fs.createReadStream("./big.file.gz")
    .pipe(crypto.createDecipher("aes192", "the_strong_secret")) // depreacted
    .pipe(zlib.createGunzip())
    .pipe(reportProgress)
    // .pipe(fs.createWriteStream(file.slice(0, -3)))
    .pipe(fs.createWriteStream("big.file_decrypted"))
    .on("finish", () => console.log("Done"));
