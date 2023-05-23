require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth.routes');
require('./database/connect');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoute);

app.listen(PORT, () =>
  console.log(`Server Is Running On Port http://localhost:${PORT}`)
);
