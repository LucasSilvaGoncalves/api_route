const express = require('express');
const app = express();
const mongoose = require('mongoose')
const {MONGO_URI} = require('./config');
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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));