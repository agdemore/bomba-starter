var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', express.static(path.join(__dirname, 'web/public')));

module.exports = router;
