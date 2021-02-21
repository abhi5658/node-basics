// https://jscomplete.com/learn/node-beyond-basics/node-streams#a-streams-practical-example
// When a client asks for that big file, we stream it one chunk at a time,
//  which means we don’t buffer it in memory at all.
//  The memory usage grew by about 25 MB and that’s it.

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    const src = fs.createReadStream("./big.file");
    src.pipe(res);
});

server.listen(8000, () => console.log('server started'));
