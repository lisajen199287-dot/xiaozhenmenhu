const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4174);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);

  if (pathname === "/" || pathname === "/showcase" || pathname === "/showcase/") {
    pathname = "/showcase.html";
  } else if (pathname === "/showcase/smart-campus/demo") {
    pathname = "/showcase.html";
  } else if (pathname.startsWith("/showcase/assets/")) {
    pathname = pathname.slice("/showcase".length);
  }

  const file = path.normalize(path.join(root, "." + pathname));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`smart campus module running at http://127.0.0.1:${port}/showcase/`);
});
