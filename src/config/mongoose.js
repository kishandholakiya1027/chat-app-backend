const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.once('open', (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("Db connect.");
});
