// https://jscomplete.com/learn/node-beyond-basics/node-streams#implementing-duplextransform-streams
const { Duplex } = require("stream");

const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log('\nHey:', chunk.toString());
        callback();
    },

    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    }
});

inoutStream.currentCharCode = 65;

/**
 * stdin input from terminal is piped into stream which uses write()
 * stdout uses read() of inoutStream
 */
process.stdin.pipe(inoutStream).pipe(process.stdout);
/**
 * whatever stdin reads from console/terminal it sends it to write() which then console.log the input
 * whatever inoutStream writes to process.stdout (process.stdout calls the read()) it shows in terminal direclty
 * [which does not go through console.log but is like process.stdout('hey')]
 */
