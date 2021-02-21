const { Transform } = require("stream");

const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

/**
 * stdin input is piped into transform stream
 * input is passed as chunk to transform()
 * transform() pushes the converted data into the readable stream 
 * which is piped to stdout
 */
process.stdin.pipe(upperCaseTr).pipe(process.stdout);
