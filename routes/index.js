var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var x;
  var y = x.caca;
  //throw {err: "JPA", value: "CAC"};
  res.render('index', { title: 'Express' });
});

module.exports = router;
