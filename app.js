var port = 8000;
var express = require('express');
var app = express();
var path = require('path');
var Web3 = require('web3');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://192.168.72.233:8545'));   // адрес открытой к общению ноды нашей знойной сети эфира

app.use(express.static(path.join(__dirname, 'web/public')));
app.use('/dist', express.static(path.join(__dirname, 'web/dist')));
app.get(function root(req, res) {
  res.sendFile(path.join(__dirname, 'web/public/index.html'));
});

app.use('/test', function root(req, res) {


  var coinbase = web3.eth.coinbase;
  var originalBalance = web3.eth.getBalance(coinbase).toNumber();
  res.json({ 'eeeee': 'pooookkkk' });
});

app.use('/test2', function root(req, res) {
  res.json({ 'eeeee222': 'pooookkkk2222' });
});

app.use('/auth', express.static(path.join(__dirname, 'web/routes/auth')));

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Server is listening at http://%s:%s', host, port);
});