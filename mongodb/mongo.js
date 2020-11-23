const mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://root:1VZVRqoIUrvtjWjN@cluster0-b7xot.gcp.mongodb.net/digitaly';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
console.log(db);

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));