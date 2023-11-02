const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://man_sakadasariya:VU3K5vVzETsKiXXn@atlascluster.qvdmi6l.mongodb.net/socket');

const db = mongoose.connection;

db.once('open', (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("Db connect.");
});
