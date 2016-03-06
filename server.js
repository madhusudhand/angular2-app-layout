var http = require('http'),
    finalhandler = require('finalhandler'),
    serveStatic = require('serve-static');

http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serveStatic("./build/")(req, res, done);
}).listen(3000);

console.log('Server started: http://localhost:3000 ...');
