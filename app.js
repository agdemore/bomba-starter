let port = 8000;
let express = require('express');
let app = express();
let path = require('path');


var http = require('http').Server(app);
var io = require('socket.io')(http);

let contractAPI = require('./contract');

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

// просто тестовый вызов чего нибудь на смарт контракте
contractAPI.doSomethingWithContract();

app.use('/test', function root(req, res) {
  res.json({ "mainAccBalance": contractAPI.test() });
});

app.use('/test2', function root(req, res) {
  res.json({ 'eeeee222': 'pooookkkk2222' });
});

app.use('/auth', require('./routes/auth'));
app.use('/bills', require('./routes/bills'));
app.use('/friends', require('./routes/friends'));

io.on('connection', function(socket) {
    console.log('connect');
    socket.broadcast.emit("test");
    io.emit('some event', { for: 'everyone' });
    // a user has visited our page - add them to the visitorsData object
    socket.on('disconnect', function() {
        console.log('disconnect');
        // a user has left our page - remove them from the visitorsData object
    });
});
http.listen(port, function() {
    console.log('listening on *:' + port);
});

// let server = app.listen(port, function() {
//   let host = server.address().address;
//   console.log('Server is listening at http://%s:%s', host, port);
// })


