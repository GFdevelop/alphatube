const http = require('http');
//var url = require('url');
//var fs = require('fs');
var loader = require('./loader.js')

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  /*
  fs.readFile('./js/loader.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
  */
  /*
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);
  */
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(loader.load());
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
