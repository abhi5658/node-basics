// https://jscomplete.com/learn/node-beyond-basics/node-streams#implementing-a-writable-stream
const { Writable } = require("stream");

const outStream = new Writable({
    write(chunk, encoding, callback) {
        console.log('why you do this:', chunk.toString());
        callback();
    }
});
/**
 * we type in terminal which gets into stdin
 * stdin pipes into our Writable stream
 * Writable stream receives chunk via chunk() function called
 * It prints the chunk to console
 */
process.stdin.pipe(outStream);

// above all same as below one liner
// process.stdin.pipe(process.stdout);
