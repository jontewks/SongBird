var express = require('express');
var request = require('request');
var token = require('./authToken.js');

var app = express();
var port = 8080;

var token = '';

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
      'Authorization': token.token,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
  }, function(err, response, bod) {
    token = JSON.parse(response.body).access_token;
    res.set('Access-Control-Allow-Origin', '*')
    res.send('HooHoooooo');
  });
});

app.listen(port);
console.log('Listening on ' + port);
