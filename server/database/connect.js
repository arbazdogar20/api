const mongoose = require('mongoose');

module.exports = mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log('DB Connected Successfully'))
  .catch((e) => console.log(e));
