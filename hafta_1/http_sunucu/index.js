import http from "node:http";

const notes = [];

const server = http.createServer((req, res) => {
  console.log(`New request: ${req.method} ${req.url}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/notes") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(notes));
  } else if (req.method === "POST" && req.url === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // 2. When the stream ends, process the data
    req.on("end", () => {
      const newNote = JSON.parse(body); // Convert string to JSON object
      notes.push(newNote); // Add to our in-memory array

      // Send 201 (Created) response back to the client
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newNote));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(" 404 Not Found");
  }
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
