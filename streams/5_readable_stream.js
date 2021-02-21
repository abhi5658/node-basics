// https://jscomplete.com/learn/node-beyond-basics/node-streams#implement-a-readable-stream
const { Readable } = require("stream");

const inStream = new Readable();

inStream.push("ABCDEFGHIJKLM\n");
inStream.push("NOPQRSTUVWXYZ\n");

inStream.push(null); // No more data

inStream.pipe(process.stdout);
