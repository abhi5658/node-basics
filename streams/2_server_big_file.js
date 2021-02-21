// https://jscomplete.com/learn/node-beyond-basics/node-streams#a-streams-practical-example
// The memory consumption jumped to 434.8 MB.

// We basically put the whole big.file content in memory 
// before we wrote it out to the response object. This is very inefficient.

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    fs.readFile("./big.file", (err, data) => {
        if (err) throw err;

        res.end(data);
    });
});

server.listen(8000, () => console.log('server started'));
