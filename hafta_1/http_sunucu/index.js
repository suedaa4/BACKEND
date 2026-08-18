import http from "node:http";

const notes = [];

const server = http.createServer((req, res) => {
  console.log(`New request: ${req.method} ${req.url}`);

  if (req.method === "GET" && req.url === "/notes") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(notes));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(" 404 Not Found");
  }
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
