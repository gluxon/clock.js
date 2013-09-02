var express = require('express');
var app = express();
var stylus = require('stylus');
var format = require('util').format;
var uuid = require('node-uuid');
require('js-yaml');

/*var MongoClient = require('mongodb').MongoClient;
var Grid = require('gridfs-stream');

var database = require(__dirname + '/config/database.yaml');
database.mongodb_uri = process.env['MONGOHQ_URL'];*/

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(stylus.middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use(express.cookieParser());
app.use(express.session({secret: uuid.v4()}));

app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.render('clock');
});

app.get('/admin', function(req, res) {
  res.render('admin', {
    loggedIn: req.session.loggedIn,
    version: '0.1.0'
  });
});

app.get('/admin/logout', function(req, res) {
  req.session.loggedIn = false;
  res.redirect('/admin');
});

app.get('/admin/:page', function(req, res) {
  res.render('admin', {
    loggedIn: req.session.loggedIn,
    version: '0.1.0',
    page: req.params.page
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});

/*MongoClient.connect(database.mongodb_uri, function(err, db) {
  if (err) throw err;
});*/

app.post('/admin/login', function(req, res) {
  if (req.body.password == 'penguins') {
    req.session.loggedIn = true;
  }
  res.redirect('/admin');
});