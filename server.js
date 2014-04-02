var express = require('express');
var request = require('request');
var authToken = require('./authToken.js');
var db = require('./dbconfig.js');

var app = express();
var port = process.env.PORT || 8080;

var accessToken = '';
var search;

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
    search = req._readableState.buffer.toString();
    request({
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + search + '&src=typd&count=100&include_entities=true',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }, function(err, response, body) {
      var tweetsObj = JSON.parse(response.body).statuses;
      if (tweetsObj) {
        for (var i = 0; i < tweetsObj.length; i++) {
          if (tweetsObj[i].entities.media) {
            var tweet = new db.Tweet({
              tweetID: tweetsObj[i].id,
              media_url: tweetsObj[i].entities.media[0].media_url,
              hashtag: search
            });
            tweet.save();
          }
        }
      }
    });
  });

  setTimeout(function() {
    db.Tweet.find().where('hashtag', search).exec(function(err, results) {
      var urlsArray = [];
      for (var i = 0; i < results.length; i++) {
        urlsArray.push(results[i].media_url);
      };
      console.log('found: ', urlsArray);
      res.send(urlsArray);
    });
  }, 1000);
});

app.listen(port);
console.log('Listening on ' + port);
