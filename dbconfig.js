var mongoose = require('mongoose');

mongoURI = process.env.MONGOLAB_URI || 'localhost:27017';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Your prayers to the Mongod have been answered.');
});

var tweetSchema = mongoose.Schema({
  tweetID: { type: Number, required: true, unique: true },
  media_url: { type: String, required: true, unique: true }
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = db;
