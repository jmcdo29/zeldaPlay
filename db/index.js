const mognoose = require("mongoose");
const dbURL = process.env.MONGODB_URI || 'mongodb://heroku_956jp6kw:ves8hk3pc8her391t3praivqjf@ds249798.mlab.com:49798/heroku_956jp6kw';

mongoose.connect(dbURL, {useMongoClient: true});

/* let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', ()=>{
  console.log('We\'re connected!');
});

module.exports = db; */