const mongoose = require('mongoose');

const StocksSchema = new mongoose.Schema({
  sku: {type: String, required: true},
  stocks_id: {type: String, required: true},
});

module.exports = mongoose.model('Stocks', StocksSchema);
