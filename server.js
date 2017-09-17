var express = require('express'),
  path = require('path');
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/twitterRoutes'); //importing route
routes(app); //register the route

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'out/index.html'));
});

app.use(express.static('out'))

app.listen(port);

console.log('RESTful API server started on: ' + port);
