var port = 8000;
var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'web/public')));
app.use('/dist', express.static(path.join(__dirname, 'web/dist')));
app.get(function root(req, res) {
  res.sendFile(path.join(__dirname, 'web/public/index.html'));
});
app.use('/test', function root(req, res) {
  res.json({ 'eeeee': 'pooookkkk' });
});
app.use('/test2', function root(req, res) {
  res.json({ 'eeeee222': 'pooookkkk2222' });
});

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Server is listening at http://%s:%s', host, port);
});