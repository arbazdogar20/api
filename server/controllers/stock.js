const {StockModel} = require('../models');

const fs = require('fs');
const {parse} = require('csv-parse');

const addStock = async (req, res) => {
  try {
    let arr = [];
    const file = req.file;

    fs.createReadStream(file.path)
      .pipe(parse({delimiter: ',', from_line: 2}))
      .on('data', function (row) {
        arr.push({stock_name: row[0], stock_Id: row[1]});
      })
      .on('end', function () {
        const stockArr = [];
        arr.forEach((item) => {
          const alreadyStock = stockArr.find(
            (i) => i.stock_name === item.stock_name
          );
          if (alreadyStock) {
            alreadyStock.stock_Id += `|${item.stock_Id}`;
          } else {
            stockArr.push(item);
          }
        });
        for (let i = 0; i < stockArr.length; i++) {
          const add = new StockModel({
            sku: stockArr[i].stock_name,
            stocks_id: stockArr[i].stock_Id,
          });
          add.save().then((res) => {});
        }
        return res.status(200).json(arr);
      })
      .on('error', function (error) {
        return res.status(500).json(error);
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addStock,
};
