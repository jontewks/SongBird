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
    var search = req._readableState.buffer.toString();
    request({
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + search + '&src=typd&count=100&include_entities=true',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }, function(err, response, body) {
      var results = [];
      var tweetsObj = JSON.parse(response.body).statuses;
      if (tweetsObj) {
        for (var i = 0; i < tweetsObj.length; i++) {
          if (tweetsObj[i].entities.media) {
            results.push(tweetsObj[i].entities.media[0].media_url);
          }
        }
      }
      res.send(results);
    });
  });
});

app.listen(port);
console.log('Listening on ' + port);
