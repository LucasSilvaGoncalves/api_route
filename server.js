const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

// Health Check para manter a API funcionando no Heroku
HealthCheck();

function HealthCheck() {
    console.log('HealthCheck API (Heroku)');
    cron.schedule("*/10 * * * *", () =>
        axios({
            method: 'get',
            url: 'https://digitaly-roteador-api.herokuapp.com/api/route'
        })
        .then(function (response) {
            console.log("Executando HealthCheck a cada 10 minutos")
        })
    );
}

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