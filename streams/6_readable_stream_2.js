// https://jscomplete.com/learn/node-beyond-basics/node-streams#implement-a-readable-stream
const { Readable } = require("stream");

/**
 * When we push a null object, that means we want to signal that the stream does not have any more data.
 */
const inStream = new Readable({
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    }
});

// setting a object property currentCharCode starting with (A = 65)
inStream.currentCharCode = 65;

/**
 * process.stdout will call keep calling read() of inStream until it finds null
 */
inStream.pipe(process.stdout);
