const express = require('express');
const app = express();
require('dotenv').config();

// Body Parser Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/route'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));