const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config');
const pm2Config = require('./ecosystem.config').apps[1].env;
require('dotenv').config();

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

// Body Parser Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/route'));

const PORT = pm2Config["PORT"];
app.listen(PORT, () => console.log(`server is running on ${PORT}`));