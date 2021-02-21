const { Transform } = require("stream");

const commaSplitter = new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        this.push(
            chunk
                .toString()
                .trim()
                .split(",")
        );
        callback();
    }
});

const arrayToObject = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        const obj = {};
        for (let i = 0; i < chunk.length; i += 2) {
            obj[chunk[i]] = chunk[i + 1];
        }
        this.push(obj);
        callback();
    }
});

const objectToString = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        this.push(JSON.stringify(chunk) + "\n");
        callback();
    }
});

process.stdin // take input
    .pipe(commaSplitter) // splits the string on ,
    .pipe(arrayToObject) // converts arrayToObject
    .pipe(objectToString) // converts obj to JSON stringify
    .pipe(process.stdout); // write transformed input to output

/**
 * Input: a,5,c,3
 * Output: {"a":"5","c":"3"}
*/
