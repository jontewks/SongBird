var express = require('express');
var request = require('request');
var authToken = require('./authToken.js');

var app = express();
var port = 8080;

var accessToken = '';

app.configure(function() {
  app.use(express.static(__dirname + '/app'));
});

app.get('/', function(req, res) {
  res.render('/views/main.html');
})

app.post('/', function(req, res) {
  // Retrieve application level access token
  request({
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    headers: {
      'Authorization': authToken.token,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
  }, function(err, response, body) {
    accessToken = JSON.parse(response.body).access_token;
    console.log(req._readableState.buffer.toString());
    res.send();
  });
});

app.listen(port);
console.log('Listening on ' + port);
