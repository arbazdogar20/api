require('dotenv').config();
require('./database/connect');
const express = require('express');
const cors = require('cors');

const {StockRoute, UserRoute} = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', UserRoute);
app.use('/stock', StockRoute);

app.listen(3001, () => console.log('Server Is Running'));
