let port = 8000;
let express = require('express');
let app = express();
let path = require('path');

let contractAPI = require('./contract');

var r = contractAPI.getAllBills();

// contractAPI.saveOpenBill({
//   id: 35,
//   type: "open",
//   clientData: "my data!",
//   summ: 20,
//   receiver: "0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC"
// });

let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'web/public')));
app.use('/dist', express.static(path.join(__dirname, 'web/dist')));
app.get(function root(req, res) {
  res.sendFile(path.join(__dirname, 'web/public/index.html'));
});

app.use('/test', function root(req, res) {
  res.json({ "mainAccBalance": contractAPI.test() });
});

app.use('/test2', function root(req, res) {
  res.json({ 'eeeee222': 'pooookkkk2222' });
});

app.use('/auth', require('./routes/auth'));
app.use('/bills', require('./routes/bills'));
app.use('/friends', require('./routes/friends'));

let server = app.listen(port, function() {
  let host = server.address().address;
  console.log('Server is listening at http://%s:%s', host, port);
});

